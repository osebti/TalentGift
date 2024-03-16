const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
const encode = require("bcryptjs");
const rounds = 10;

client = require("../db.js");

router.post("/", async function (req, res) {
  // get password, email from request
  console.log("Body", req.body);
  const email = req.body.email;
  const password = await encode.hash(req.body.password, rounds); // password hashed with auto-generated salt
  const date = new Date().toISOString(); // today's date
  console.log(date);
  // const first_name = req.body.first_name;
  // const last_name = req.body.last_name;
  const notifications = false;

  client.query(
    "insert into users(email, password, datemodified, firstName, lastname, notifications)\
        VALUES($1,$2,$3,$4,$5,$6) RETURNING uid",
    [email, password, date, null, null, notifications],
    function (err, result) {
      if (err) {
        console.log("Internal Error");
        res.status(400);
        res.send(err.message);
      } else {
        console.log(result);
        res.status(200); // success status
        res.send({
          status: 0,
          user: { uid: result.rows[0].uid },
          message: "User sucessfully added!",
        });
      }
    }
  );
});

module.exports = router;
