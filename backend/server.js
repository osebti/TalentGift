// This file contains the API endpoints. HTTP requests are processed using an Express server
const https = require("https");
const express = require("express");
const app = express();
const cors = require("cors");
const port_num = 5000;
app.use(cors());

client = require("./db");

signIn =    require("./routes/signIn");
signUp =    require("./routes/signUp");
surveys =   require("./routes/surveys");
members =   require("./routes/members");
links =     require("./routes/links");
org =       require("./routes/organization");
profile =   require("./routes/profile");
reports =   require("./routes/reports");
resetPass = require("./routes/resetPassword")


app.use("/signIn", signIn);
app.use("/signUp", signUp);
app.use("/surveys", surveys);
app.use("/members", members);
app.use("/links", links);
app.use("/organization", org);
app.use("/profile", profile);
app.use("/reports", reports);
app.use("/reset-password", resetPass);

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

const encode = require("bcryptjs");
const rounds = 10;

// Setting up server object, post/get request handling, etc.
const fs = require("fs");
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/"); // INSERT file name later
});

app.get("/emails", async function (req, res) {
  // retrieve all user emails in the database
  const query = "SELECT email FROM users";
  client.query(query, function (err, result) {
    if (err) {
      res.status(400).send(err.message);
    } else {
      const arr = result.rows; // array of JSON objects with uid field
      const emails = arr.map((user) => user.email);
      console.log(emails);
      res.status(200).send(emails);
    }
  });
});

app.listen(port_num, () =>
  console.log(`Server is running at http://localhost:${port_num}`)
);
