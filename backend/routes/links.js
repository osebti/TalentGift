const express = require("express");
const router = express.Router();
client = require("../db.js");
const bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
const nodemailer=require('nodemailer')
const config = {
  hostname: "[2605:fd00:4:1001:f816:3eff:fe61:d5c8]",
};





const transporter = nodemailer.createTransport({
  service:"gmail",
  auth: {
    user: 'alexnguyenswe@gmail.com', // put in your email to test this, will not work with new email 
    pass: 'rpsq hupx bnpk irbt',
    tls:{
      rejectUnauthorized:false
    }
  }
});


function makeToken(length) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}



router.get("/check_token", function(req,res){
  client.query("SELECT MANAGER,EXPIRATION FROM OTLINKS WHERE TOKEN=$1", [req.query.token], function (err, result) {
    if(result.rowCount==0 || req.query.token == null){ // check if token exists
      res.json({status:1}) // token is not valid
      return
    }
    row=result.rows[0]
    console.log(row);
    date=row.expiration
    manager=row.manager
    
    client.query("DELETE FROM OTLINKS WHERE TOKEN=$1",[req.query.token],function(err,info){
        if(err){
          console.log(err)
        }
      }); // token is deleted
    // return the data, token is valid
    res.status(200)
    res.json({status:0,manager:manager})
  });
  
})



router.post("/takeSurvey/*", async function (req, res) {

  /* Note: this endpoint is not responsible for deleting expired links, insead
     a linux cron-job does that automatically */

  ot_link = req.url;
  client.query("SELECT URL FROM OTLinks WHERE TOKEN=$1", [ot_link], function(err, result) {
    if (result.rowCount == 0) {
      res.status(400);
      res.json({ message: "one-time link has expired" });
    }
    result = result.rows[0];
    let query = querystring.parse(result.url);
  
    if (Date.parse(result["releaseDate"]) < Date.parse(Date())) {
      // make sure date is still valid
      res.status(400);
      res.json({ message: "one-time link has expired" });
    }
  
    res.status(200);
    res.setHeader("content-type", "application/json");
    res.json(data); // send response as json object
  });
});


router.get("/send_link",  function (req, res) {
  
  var token = makeToken(30) // random token 
  var email=req.query.email

  if(email==null){
    res.json({status:1})
  }

  client.query("SELECT * FROM users WHERE email=$1", [email],function(err,result){
    if(result==undefined){
      res.send(JSON.stringify({status:1}))
      return
    }

    else if (result.rowCount==0){
      res.status(400)
      res.json({status:1}) // db error email not found 
      return 
    }

    row=result.rows[0]
    var manager=row.manager
    var uid=row.uid
  
    var link=  `http://${config.hostname}/ResetPassword?email=${req.query.email}&uid=${uid}&token=${token}`
    
    const date = new Date();
    const numberOfDays = 7; // set deadline to be 1 week from current date
    date.setDate(date.getDate() + numberOfDays);
    // store token in database 
    result =  client.query("INSERT INTO otlinks(TOKEN,UID,EMAIL,MANAGER,EXPIRATION) VALUES($1,$2,$3,$4,$5)", [token, uid, req.query.email, manager, date]); 
  
    client.query("INSERT INTO PASS_LINKS(uid, email, token, expiration) VALUES($1,$2,$3,$4)", [uid, req.query.email, token, date]);
      // send email 
    console.log(req.query.email);
    var options = {
      from: '"Talent-Gift" <take-survey@talentgift.com>', // sender address
      to: req.query.email, // list of receivers
      subject: "Talent Gift Link", // Subject line
      text:
        "Here is a link to join Talent Gift. Please set your password using the following link.\n\nLink: " + link, // plain text body
    };
  
    var email =  transporter.sendMail(options, function(error,info){
      if (error) {
        console.log(error);
      } 
      else {
        console.log('Email sent: ' + info.response);
      }
  
    });
  
    res.status(200)
    res.json({status:0})
  });
});




router.get("/resetLink",  function(req,res){ 
  // sends a reset password link 
 
  var token = makeToken(30) // random token 
  var email=req.query.email

  if(email==null){
    res.json({status:1})
  }

  client.query("SELECT * FROM users WHERE email=$1", [email],function(err,result){
    if(result==undefined){
      res.send(JSON.stringify({status:1}))
      return
    }

    else if (result.rowCount==0){
      res.status(400)
      res.json({status:1}) // db error email not found 
      return 
    }

    row=result.rows[0]
    var manager=row.manager
    var uid=row.uid
  
   
  
    var link=  `http://${config.hostname}/ResetPassword?email=${req.query.email}&uid=${uid}&token=${token}`
    
    const date = new Date();
    const numberOfDays = 7; // set deadline to be 1 week from current date
    date.setDate(date.getDate() + numberOfDays);
    // store token in database 
    result =  client.query("INSERT INTO otlinks(TOKEN,UID,EMAIL,MANAGER,EXPIRATION) VALUES($1,$2,$3,$4,$5)", [token, uid, req.query.email, manager, date]); 
  
    client.query("INSERT INTO PASS_LINKS(uid, email, token, expiration) VALUES($1,$2,$3,$4)", [uid, req.query.email, token, date]);
      // send email 
    console.log(req.query.email);
    var options = {
      from: '"Talent-Gift" <take-survey@talentgift.com>', // sender address
      to: req.query.email, // list of receivers
      subject: "Reset Password Link", // Subject line
      text:
        "Please find below your one time reset password link.\n\nLink: " + link, // plain text body
    };
  
    var email =  transporter.sendMail(options, function(error,info){
      if (error) {
        console.log(error);
      } 
      else {
        console.log('Email sent: ' + info.response);
      }
  
    });
  
    res.status(200)
    res.json({status:0})


  });


});


router.get("/check_pass_token", async function(req,res){


  if(req.query.token==null){
    res.json({status:1})
  }

  client.query("SELECT * FROM PASS_LINKS WHERE TOKEN=$1",
  [req.query.token], function(err, result) {

  	if(result.rowCount==0){ // check if token exists
    		res.json({status:1}) // token is not valid
  	}	
  	row=result.rows[0]
  	console.log(row)
  	date=row.expiration
  	manager=row.manager
  	email=row.email
  	if(Date(date) < Date()){
    		client.query("DELETE FROM PASS_LINKS WHERE TOKEN=$1",[req.query.token]) // token is deleted 
    		res.json({status:1}) // token expired (due date passed)
    		return
  	}

  	client.query("DELETE FROM PASS_LINKS WHERE TOKEN=$1",[req.query.token]) // token is deleted 

  	// token is valid
  	res.status(200)
  	res.json({status:0,manager:manager,email:email})
   });
})



router.get("/test_link", function(req,res){

  var email='arnguyen@ualberta.ca'
  var link=makeToken(30)
  var options = {
    from: '<Talent-Gift>', // sender address
    to: email, // list of receivers
    subject: "Reset Password Link", // Subject line
    text:
      "Please find below your one time reset password link.\n\nLink: " + link, // plain text body
  };

  var email =  transporter.sendMail(options, function(error,info){
    if (error) {
      console.log(error);
    } 
    else {
      console.log('Email sent: ' + info.response);
    }

  });

  res.status(200)
  res.json({status:0})

});


module.exports = router;
