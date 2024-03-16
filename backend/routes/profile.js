const express = require("express");
const router = express.Router();
client = require("../db.js");
const bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
const encode = require("bcryptjs");

router.get("/name/:uid", function (req, res) {
  const uid = req.params.uid;
  const query = "SELECT firstname, lastname FROM users WHERE uid = $1";

    client.query(query, [uid], function (err, result) {
        const firstName = result.rows[0].firstname;
        const lastName = result.rows[0].lastname;

        if (err) {
            throw err;
        }
        if (result.rows.length === 0) {
            res.status(404).send("User Not Found!");
        } else {
            res.status(200).send(
                JSON.stringify({
                status: 0,
                name: `${firstName} ${lastName}`,
                })
            );
        }
  });
});



router.get("/email/:uid", function (req, res) {
  const uid = req.params.uid;
  const query = "SELECT email FROM users WHERE uid = $1";

    client.query(query, [uid], function (err, result) {
    const email = result.rows[0].email;

    if (err) {
        throw err;
    }
    if (result.rows.length === 0) {
        res.status(404).send("User Not Found!");
    } else {
        res.status(200).send(JSON.stringify({
            status: 0,
            email: email,
          })
        );
    }
  });
});

router.patch("/name/:uid", function (req, res) {
    const uid = req.params.uid;
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    
    const data = [uid, firstname, lastname]

    const query = `UPDATE users SET 
                        firstname = $2, 
                        lastname = $3 
                        WHERE uid = $1`;

    client.query(query, data, function (err, result) {
    
        if (err) {
            res.status(404).send(
                JSON.stringify({
                    status: 0,
                    message: `User Not Found`,
                })
            ); 
            throw err;
        }

        res.status(200).send(
            JSON.stringify({
                status: 0,
                message: `Name updated to ${firstname} ${lastname}`,
            })
        ); 
        
    });
});

router.patch("/email/:uid", function (req, res) {
  const uid = req.params.uid;
  const email = req.body.email;
  
  const data = [uid, email];

  const query = `UPDATE users SET email = $2 WHERE uid = $1`;

  client.query(query, data, function (err, result) {
  
      if (err) {
          res.status(404).send(
              JSON.stringify({
                  status: 0,
                  message: `User Not Found`,
              })
          ); 
          throw err;
      }

      res.status(200).send(
          JSON.stringify({
              status: 0,
              email: email,
          })
      ); 
      
  });
});

router.patch("/password/:uid", function (req, res) {
    res.redirect("/reset-password/");
});

router.patch("/notifications/:uid", function (req, res) {
  // Toggle notification settings for a given user
  const uid = req.params.uid;
  const date = new Date().toISOString(); // today's date
  const query =
    "UPDATE users SET notifications = NOT notifications, datemodified = $1 WHERE uid = $2 RETURNING notifications";
  client.query(query, [date, uid], function (err, result) {
    if (err) {
      res.status(400).send({
        status: 1,
        err: err.message,
        message: "Internal server error",
      });
    }
    if (result.rows.length > 0) {
      res.status(200).send({
        status: 0,
        message: "Notification settings updated!",
        notifications: result.rows[0].notifications,
      });
    } else {
      res
        .status(400)
        .send({ status: 1, message: "Could not update notification settings" });
    }
  });
});

module.exports = router;
