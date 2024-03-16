const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
client = require("../db.js");

const querystring = require("querystring");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.forwardemail.net",
  port: 465,
  secure: true,
  auth: {
    // replace 'user' and 'pass' values with <https://forwardemail.net> user and pass
    user: "<example@gmail.com>",
    pass: "talent-gift",
  },
});

const rounds = 10;

router.get("/:sid", async function (req, res) {
  // employee and manager request

  // Get survey id sent from frontend
  const sid = req.params.sid;

  // Retrieve survey from the database
  const query = "SELECT * FROM surveys WHERE sid = $1";

  client.query(query, [sid], function (err, result) {
    if (err) {
      res.status(500).send({
        status: 1,
        error: err.message,
        message: `Failed to load survey data.`,
      });
    } else {
      // Send survey information to frontend
      const survey = [...result.rows];
      const data = { status: 0, survey: survey[0] };
      res.status(200).json(data);
    }
  });
});

router.post("/create_survey", function (req, res) {
  var questions = req.body.Question;
  var answers = req.body.Answers;
  const releaseDate = new Date().toISOString(); // today's date
  const dueDate = req.body.Due_date;
  const numQuestions = questions.length;
  const visibility = false;
  var query = `INSERT INTO surveys (questions, answers, releasedate, duedate, numquestions, visibility) 
                VALUES ($1, $2, $3, $4, $5, $6)
                RETURNING sid`

  // assuming questions is a list of questions where each index pertains to a set of answers for that questions in a questions list
  var value = [
    questions,
    answers,
    releaseDate,
    dueDate,
    numQuestions,
    visibility,
  ];

  client.query(query, value, function (err, result) {
    console.log({ questions, answers });
    console.log(result);
    if (err) throw err;
    sid = result.rows[0].sid
    res
      .status(200)
      .send({ status: 0,
              message: "1 row inserted into surveys table!",
              id: sid});
    console.log("1 row inserted: " + sid);
  });
  console.log(req.body);
});

router.post("/publish_survey", function (req, res) {
  var query = "UPDATE surveys SET visibility = $1 WHERE sid = $2";

  // assuming sid is returned as an int
  var survey_id = req.body.Survey_id;
  var data = [true, survey_id];

  client.query(query, data, function (err, result) {
    if (err) throw err;
    res
      .status(200)
      .send({ status: 0, message: "Survey visibility set to true" });
  });

  console.log(req.body);
});

router.post("/take_survey", function (req, res) {
  // Check if user has taken survey before
  // assume we receive survey id and employee id as ints and answers as a list of string responses, where index i
  // corresponds to the question being answered
  var oid = req.body.oid;
  var employee_id = req.body.Employee_id;
  var answers = req.body.Answers;
  var survey_id = req.body.Survey_id;
  let check_survey;
  let data;
  if (survey_id == 2) {
    check_survey = "SELECT * FROM answers WHERE oid = $1 AND sid = $2";
    data = [oid, survey_id];
  } else {
    check_survey = "SELECT * FROM answers WHERE userid = $1 AND sid = $2";
    data = [employee_id, survey_id];
  }

  client.query(check_survey, data, function (err, result) {
    if (err) throw err;
    if (result.rows.length > 0) {
      // Employee has taken survey (update row in answers table)
      var query = "UPDATE answers SET answers = $1 WHERE userid = $2 AND sid = $3 AND oid = $4";
      client.query(query, [answers, employee_id, survey_id, oid], function (err, result) {
        if (err) throw err;
        res.status(200).send({ status: 0, message: "Answers updated" });
      });
    } else {
      // Employee has not taken survey
      var query = "INSERT INTO answers (sid, userid, answers, oid) VALUES ($1, $2, $3, $4)";
      client.query(query, [survey_id, employee_id, answers, oid], function (err, result) {
        if (err) throw err;
        res.status(200).send({ status: 0, message: "Answers inserted into table" });
      });
    }
  });
});

router.post("/set_visibility", function (req, res) {
  var query = "SELECT visibility FROM surveys WHERE sid = $1";
  // assume we receive publicity as a boolean variable, corresponding to whether
  // the user wants to make the server public or private
  var survey_id = req.body.Survey_id;
  var publicity = req.body.makePublic;

  // get the current visibility of the post
  client.query(query, [survey_id], function (err, result) {
    if (err) throw err;
    if (result.affectedRows == 0) {
      console.log("Post Not Found");
      res.status(404).end();
    }

    var visibility = result.rows[0].visibility;
    // if the current visibility of the post is the same as the requested visibility
    // send an error message
    if (visibility === publicity) {
      if (publicity) {
        return res.status(400).json({
          status: 0,
          message: "The survey is already public!",
        });
      } else {
        return res.status(400).json({
          status: 0,
          message: "The survey is already private!",
        });
      }
    } else {
      // insert values into table
      var query = `
        UPDATE surveys
        SET visibility = $2
        WHERE id = $1
        ` ;
      var value = [survey_id, publicity];

      client.query(query, value, function (err, result) {
        if (err) throw err;
        if (publicity){
          res.status(201).send({
            status: 0, 
            message: "The Post has been made public" });
        } else {
          res.status(201).send({
            status: 0, 
            message: "The Post has been made private" });
        }
      });
    }
  });
});

module.exports = router;
