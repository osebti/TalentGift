const express = require("express");
const router = express.Router();
client = require("../db.js");
const bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.patch("/", function (req, res) {
  // Update organization id of a member
  const email = req.body.email;
  const oid = req.body.oid;
  const date = new Date().toISOString(); // today's date

  const criticalPositions = req.body.criticalPositions;

  const query =
    "UPDATE users SET oid = $2, datemodified = $3, criticalpositions = $4 WHERE email = $1";

  client.query(
    query,
    [email, oid, date, criticalPositions],
    function (err, result) {
      if (err) {
        res.status(400).send({
          status: 1,
          err: err.message,
          message: "Internal server error",
        });
      } else {
        res.status(200).send({ status: 0, message: "Organization ID updated" });
      }
    }
  );
});

router.post("/", function (req, res) {
  // Add member to the database
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const email = req.body.email;
  const position = req.body.position;
  const password = "0"; // flag denoting that password has not been set
  const oid = req.body.oid;

  const date = new Date().toISOString(); // today's date

  const criticalPositions = req.body.criticalPositions;

  console.log(firstname, lastname, email, position, oid);
  const query =
    `INSERT into users(firstname, lastname, datemodified, email, role, password, oid, notifications, criticalpositions)
     VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9) 
     RETURNING uid`;

  client.query(
    query,
    [
      firstname,
      lastname,
      date,
      email,
      position,
      password,
      oid,
      true,
      criticalPositions,
    ],
    function (err, result) {
      if (err) {
        res.status(400).send({
          status: 1,
          err: err.message,
          message: "Internal server error",
        });
      } else {
        const uid = result.rows[0].uid;
        console.log("User added!");
        res
          .status(200)
          .send({ status: 0,
                  message: "Added member to the database",
                  id: uid});
      }
    }
  );
});

// Delete member from organization
router.delete("/:uid", function (req, res) {
  const uid = req.params.uid;
  const query = "DELETE FROM users WHERE uid = $1";
  client.query(query, [uid], function (err, result) {
    if (err) {
      res.status(400).send({
        status: 1,
        err: err.message,
        message: "Internal server error",
      });
    } else {
      console.log("User deleted!");
      res.status(200).send({
        status: 0,
        message: `User with id ${uid} removed from organization`,
      });
    }
  });
});

module.exports = router;
