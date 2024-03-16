const express = require("express");
const router = express.Router();
client = require("../db.js");
const bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.post("/create_organization", function (req, res) {
  // assume we receive publicity as a boolean variable, corresponding to whether
  // the user wants to make the server public or private
  let { oid, mid, orgname } = req.body;

  // oid should not be supplied since it will be updated on its own
  if (oid !== undefined) {
    return res.status(400).send({
      status: 1,
      message: "oid should not be supplied",
    });
  }
  // orgname is should not be null
  if (orgname == undefined) {
    return res.status(400).send({
      status: 1,
      message: "orgname should be supplied",
    });
  }

  let data = [mid, orgname];
  var query = `
      INSERT INTO organizations (mid, orgname)
      VALUES ($1, $2)
      RETURNING oid`;

  client.query(query, data, function (err, result) {
    if (err) throw err;

    console.log(result);
    const oid = result.rows[0].oid;
    const updateUserQuery = "UPDATE users SET oid = $1, role = 'Manager' WHERE uid = $2";
    client.query(updateUserQuery, [oid, mid], function (err, finalResult) {
      if (err) throw err;

      res.status(201).send({
        status: 0,
        message: "New Organization Created",
        id: oid,
      });
    });
  });
});

// Get all members in an organization with a specific oid
router.get("/members/:oid", function (req, res) {
  const oid = req.params.oid;

  // Get manager ID
  const midQuery = "SELECT mid FROM organizations WHERE oid = $1";
  client.query(midQuery, [oid], function (err, result) {
    const mid = result.rows[0].mid;

    // Get member details
    const query =
      "SELECT firstname, lastname, uid, role, oid FROM users WHERE oid = $1 ORDER BY uid";
    client.query(query, [oid], function (err, result) {
      if (err) {
        throw err;
      }
      if (result.rows.length === 0) {
        res.status(404).send("No members in organization found");
      } else {
        for (let i = 0; i < result.rowCount; i++) {
          const member = result.rows[i];
          // Determine if each member is a manager or member
          if (member.uid === mid) {
            result.rows[i]["membership"] = "Manager";
          } else {
            result.rows[i]["membership"] = "Member";
          }
        }
        res.status(200).send(result.rows);
      }
    });
  });
});

// Get all member emails in an organization
router.get("/members/emails/:oid", function (req, res) {
  const oid = req.params.oid;

  const query = "SELECT uid, email FROM users WHERE oid = $1";
  client.query(query, [oid], function (err, result) {
    if (err) {
      throw err;
    }
    if (result.rows.length === 0) {
      res.status(200).send("No members in organization found");
    } else {
      res.status(200).send(result.rows);
    }
  });
});

router.get("/:oid", function (req, res) {
  const oid = req.params.oid;

  // Get the organization
  const query = "SELECT * FROM organizations WHERE oid = $1";
  client.query(query, [oid], function (err, result) {
    if (err) {
      throw err;
    }
    if (result.rows.length === 0) {
      res.status(404).send("Organization Not Found");
    }

    res.status(200).send(result.rows);
  });
});

router.delete("/:oid", function (req, res) {
  const oid = req.params.oid;

  // Delete the organization
  const query = "DELETE FROM organizations WHERE oid = $1";
  client.query(query, [oid], function (err, result) {
    if (err) {
      res.status(404).send("Organization Not Found");
    }

    res.status(200).send({
      status: 0,
      message: `Organization with id ${oid} has been removed`,
    });
  });
});

module.exports = router;
