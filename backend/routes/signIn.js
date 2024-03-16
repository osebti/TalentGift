const express = require("express");
const router = express.Router();
client = require("../db.js");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
const encode = require("bcryptjs");
const rounds = 10;

router.get("/", function (req, res) {
  console.log(req.query);
  const email = req.query.email;
  const password = req.query.password;

  // Find user in the database through their email
  const query = "SELECT * FROM users WHERE email=$1";
  client.query(query, [email], function (err, user) {
    // Handle case where the email is not in the database
    console.log(user);
    if (user.rows.length === 0) {
      // No account found
      console.log(`User with email ${email} not found!`); // for debugging
      res
        .status(400)
        .send({ status: 1, message: `User with email ${email} not found!` });
      return;
    }

    if (err) {
      res.status(400).send({ status: 1, error: err.message });
    } else {
      // Generate hash from inputted password, compare to hash in database
      // Referenced: https://www.npmjs.com/package/bcrypt?activeTab=readme (Retrieved Oct. 5 2023)

      const hashInDB = user.rows[0].password;
      // Check if inputted password matches password (stored as hash) in the database
      bcrypt.compare(password, hashInDB, async function (err, result) {
        if (result) {
          console.log("Logged in successfully"); // for debugging

          // Determine if user is a manager
          const managerQuery = "SELECT mid FROM organizations WHERE mid = $1";
          const managerQueryResult = await client.query(managerQuery, [
            user.rows[0].uid,
          ]);
          console.log(managerQueryResult);
          if (managerQueryResult.rows.length > 0) {
            res
              .status(200)
              .send({ status: 0, user: user.rows[0], manager: true });
          } else {
            res
              .status(200)
              .send({ status: 0, user: user.rows[0], manager: false });
          }
        } else if (err) {
          res.status(400).send({ status: 2, message: err.message });
        } else {
          // Password is incorrect
          console.log("Incorrect Password!"); // for debugging
          res.status(400).send({ status: 2, message: "Incorrect Password!" });
        }
      });
    }
  });
});

module.exports = router;
