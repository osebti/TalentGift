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
  const uid = req.query.uid;
  const password = req.query.password;
  var new_pass=req.query.new_password;

    // Generate hash from inputted password, compare to hash in database
    result=client.query(query, [uid], function (err, user) {
        // Handle case where the email is not in the database
        if(err){
            console.log(err)
            res.status(400).send({message:"Unexpected Error"})
        }
        console.log(user);
        if (user.rows.length == 0) {
          // No account found
          console.log(`User with email ${email} not found!`); // for debugging
          res
            .status(400)
            .send({ status: 1, message: `User with email ${email} not found!` });
        }
    })

    const hashInDB = result.rows[0].password;
    // Check if inputted password matches password (stored as hash) in the database


    bcrypt.compare(password, hashInDB, async function (err, result) {
        if (result) {
            console.log("Correct current password"); // for debugging
            new_pass=hash.encode(new_pass,rounds)

        // Determine if user is a manager
            const updateQuery = "UPDATE users SET password = $2 WHERE uid = $1";
            const managerQueryResult = await client.query(managerQuery, [
            user.rows[0].uid,new_pass]);
            console.log(managerQueryResult);
            if (managerQueryResult.rows.length > 0) {
                res.status(200).send({ status: 0, user: user.rows[0], manager: true });
            } 
            else {
                res.status(200).send({ status: 0, user: user.rows[0], manager: false });
            }
        } 
        else if (err) {
            res.status(400).send({ status: 2, message: err.message });
        } 
        else {
          // Password is incorrect
            console.log("Incorrect Password!"); // for debugging
            res.status(400).send({ status: 2, message: "Incorrect Password!" });
        }
    });
});



router.get("/resetPass", async function(req,res){
    const email = req.query.email;
    const password = req.query.password;

    const rounds = 10;
    const hashedPassword = await encode.hash(password, rounds); // password hashed with auto-generated salt
    const updateQuery = "UPDATE users SET password = $2 WHERE email = $1";
    result=client.query(updateQuery,[email,hashedPassword])
    res.status(200)
    res.json({status:0})
})



module.exports = router;
