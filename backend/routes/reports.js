const express = require("express");
const router = express.Router();
client = require("../db.js");
const bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

const personality = [1, 2, 3]; // list of indexes of questions in the section
const stage_development = [4];

const stage_development_match = [
  "Individual dependent contributor",
  "Individual autonomous contributor",
  "Contributor through others",
  "Leader of leaders",
];

const motivations = [6];

const motivations_match = [
  "Feedback",
  "Abilities fit",
  "Resources",
  "Benefits",
];
const alerts = [9, 10, 11, 12];
const values = [5];

const value_match = [
  "Power",
  "Achievement",
  "Benevolent",
  "Achievement",
  "Achievement",
  "Universalism",
  "Security/Conformity",
  "Conservation/Conformity",
  "Self-Direction",
  "Stimulation",
];

var managerFeedback = "Good"; // Feedback is either 'Good' or 'Alert'

const business_strategy_match = [
  "Agility connecting people",
  "Agility with influence",
  "Agility with results and execution",
  "Comfort with complexity and ambiguity",
  "Agility with innovation",
];

const leadership_style_match = [
  "Delegating Style",
  "Support Style",
  "Directing Style",
  "Training and Support Style",
  "Coaching Style",
];

class Report {
  constructor(user_answers) {
    this.user_answers = user_answers; // user answers
    this.date = Date(); // Date the report is generated, to be stored in the database
  }

}

class UserReport extends Report {
  constructor(user_answers) {
    super(user_answers);
  }

  getPersonality() {
    // return personality style
    const ans = this.user_answers;
    const a1 = ans[personality[0]];
    const a2 = ans[personality[1]];
    if (a1 == 1 && a2 == 1) {
      return "Dominant";
    } else if (a1 == 2 && a2 == 2) {
      return "Steadiness";
    } else if (a1 == 2 && a2 == 1) {
      return "Influence";
    } else {
      return "Conscientiousness";
    }
  }

  getDevelopment() {
    const ans = this.user_answers[4];
    return stage_development_match[ans - 1];
  }

  getValues() {
    const ans = this.user_answers[5];
    return value_match[ans - 1]; // index is zero-based
  }
  getMotivations() {
    const ans = this.user_answers[6];
    return motivations_match[ans - 1]; // index is zero-based
  }

  getRecommendations() {
    // TODO: Implement getRecommendations (return a string array containing recommendations)
    return [];
  }
}

class ManagerReport extends UserReport {
  constructor(user_answers, answer_matching, type) {
    super(user_answers, answer_matching, type);
    this.nextSteps = null;
    this.personality = null;
    this.pos_balance = null;
    this.values = null;
    this.development = null;
    this.alerts = { delegation: false, support: false, direction: false }; // list of possible alerts to manager (employee may need support, etc.)
    this.spanOfControl = null;
    this.spanOfSupport = null;
    this.spanOfAccountability = null;
    this.spanOfInfluence = null;
    this.balanced = null;
  }

  getAlerts() {
    const answers = this.user_answers;
    const ans9 = answers[8];
    const ans10 = answers[9];
    const ans11 = answers[10];
    const ans12 = answers[11];
    const ans13 = answers[12];

    if (ans9 == 2 && ans10 == 2) {
      this.alerts["direction"] = true;
    } else if (ans9 == 2 || ans10 == 2) {
      this.alerts["support"] = true;
    } else if (ans9 == 1 && ans10 == 1) {
      this.alerts["delegation"] = true;
    }

    if (ans11 == 2 || ans11 == 3 || ans11 == 4) {
      this.alerts["support"] = true;
    }
    if (ans11 == 1) {
      this.alerts["delegation"] = true;
    }
    if (ans12 == 2) {
      this.alerts["delegation"] = true;
    }
    if (ans12 == 1) {
      this.alerts["support"] = true;
    }
    if (ans13 == 1) {
      if (this.alerts["support"] == true) {
        this.managerFeedback = "Good Job!";
      }
      if (this.alerts["delegation"] == true) {
        // override previous feedback
        this.managerFeedback = "Action Needed!";
      }
    }
    if (ans13 == 2) {
      if (this.alerts["delegation"] == true) {
        // override previous feedback
        this.managerFeedback = "Good Job!";
      }

      if (this.alerts["support"] == true) {
        this.managerFeedback = "Action Needed!";
      }
    }
  }

  getSpanOfControl() {
    return Number(this.user_answers[14]);
  }

  getSpanOfSupport() {
    return Number(this.user_answers[15]);
  }

  getSpanOfInfluence() {
    return Number(this.user_answers[16]);
  }

  getSpanOfAccountability() {
    return Number(this.user_answers[17]);
  }

  calculateOrganizationGAP() {
    return Math.abs(
      this.spanOfControl +
        this.spanOfSupport -
        (this.spanOfInfluence + this.spanOfAccountability)
    );
  }

  determineIfBalanced(organizationGAP) {
    console.log(organizationGAP);
    return organizationGAP <= 1;
  }

  generateReport() {
    // this method will fill in all the null fields
    // The questions are divided in diferent sections: personality, notes, etc.
    this.personality = this.getPersonality();
    this.values = this.getValues();
    this.motivations = this.getMotivations();
    this.development = this.getDevelopment();
    this.getAlerts();
    this.spanOfControl = this.getSpanOfControl();
    this.spanOfSupport = this.getSpanOfSupport();
    this.spanOfAccountability = this.getSpanOfAccountability();
    this.spanOfInfluence = this.getSpanOfInfluence();
    this.balanced = this.determineIfBalanced(this.calculateOrganizationGAP());
  }
}

class IndividualReport extends UserReport {
  constructor(user_answers, answer_matching, type) {
    super(user_answers, answer_matching, type);
    this.recommendations = null; //
    this.personality = null;
    this.pos_balance = null;
    this.values = null;
    this.development = null;
    this.recommendations = [];
  }

  generateReport() {
    // this method will fill in all the null fields
    // The questions are divided in different sections: personality, notes, etc.
    this.personality = this.getPersonality();
    this.values = this.getValues();
    this.motivations = this.getMotivations();
    this.development = this.getDevelopment();
    this.recommendations = this.getRecommendations();
  }
}

class OrganizationReport extends Report {
  constructor(user_answers, answer_matching, type) {
    super(user_answers, answer_matching, type);
    this.businessStrategy = null;
    this.leadershipStyle = null;
  }

  getBusinessStrategy() {
    // Interpret answers for business strategy
    const answers = this.user_answers;
    const ans1 = answers[0];
    return business_strategy_match[ans1 - 1];
  }

  getLeadershipStyle() {
    // Interpret answers for leadership style
    const answers = this.user_answers;
    const ans2 = answers[1];
    const ans3 = answers[2];
    const ans4 = answers[3];
    const ans5 = answers[4];

    // TODO: The client did not include all possible combinations (need to ask her next sprint)
    if (ans2 == 1 && ans3 == 1 && ans4 == 1 && ans5 == 1) {
      return leadership_style_match[0];
    } else if (ans2 == 2 && ans3 == 1 && ans4 == 1 && ans5 == 1) {
      return leadership_style_match[1];
    } else if (ans2 == 2 && ans3 == 2 && ans4 == 1 && ans5 == 1) {
      return leadership_style_match[2];
    } else if (ans2 == 2 && ans3 == 2 && ans4 == 2 && ans5 == 2) {
      return leadership_style_match[3];
    } else {
      // ans2 == 2 && ans3 == 2 && ans4 == 2 && ans5 == 1)
      return leadership_style_match[4];
    }
  }

  generateReport() {
    // this method will fill in all the null fields; add any params needed
    this.businessStrategy = this.getBusinessStrategy();
    this.leadershipStyle = this.getLeadershipStyle();
  }
}

router.get("/individualReport", function (req, res) {
  const uid = req.query.uid;
  const query = "SELECT answers FROM answers WHERE userID = $1 AND sid = 1";

  client.query(query, [uid], function (err, result) {
    if (err) {
      console.log("Unexpected Database Error");
      throw err;
    }
    if (result.rows.length === 0) {
      res.status(404).send("No report for specified user found!");
    } else {
      const answers = result.rows[0].answers;
      var report_obj = new IndividualReport(answers);
      report_obj.generateReport();
      var report = {};
      for (const field of Object.keys(report_obj)) {
        report[field] = report_obj[field];
      }
      res.status(200);
      res.send(JSON.stringify(report));
    }
  });
});

router.get("/managerReport", function (req, res) {
  var uid = req.query.uid;
  var query = "SELECT answers FROM answers WHERE userID = $1 AND sid = 1";

  client.query(query, [uid], function (err, result) {
    if (err) {
      console.log("Unexpected Database Error");
      throw err;
    }
    if (result.rows.length === 0) {
      res.status(404).send("No report for specified user found!");
    } else {
      const answers = result.rows[0].answers;
      var report_obj = new ManagerReport(answers);
      report_obj.generateReport();
      var report = {};
      for (const field of Object.keys(report_obj)) {
        report[field] = report_obj[field];
      }
      res.status(200);
      res.send(JSON.stringify(report));
    }
  });
});

router.get("/organizationReport", function (req, res) {
  var oid = req.query.oid;
  var query = "SELECT answers FROM answers WHERE oid = $1 AND sid = 2";

  client.query(query, [oid], function (err, result) {
    if (err) {
      console.log("Unexpected Database Error");
      throw err;
    }
    if (result.rows.length === 0) {
      res.status(404).send("No report found for your organization!");
    } else {
      const answers = result.rows[0].answers;
      var report_obj = new OrganizationReport(answers);
      report_obj.generateReport();
      console.log(Object.values(report_obj));
      var report = {};
      for (const field of Object.keys(report_obj)) {
        report[field] = report_obj[field];
      }
      res.status(200);
      res.send(JSON.stringify(report));
    }
  });
});

router.get("/criticalPositions", function (req, res) {
  // Get all critical positions for an organization
  const oid = req.query.oid;
  const query =
    "SELECT DISTINCT role, criticalpositions FROM users WHERE oid = $1 AND criticalpositions IS NOT NULL";

  client.query(query, [oid], function (err, result) {
    if (err) {
      console.log("Unexpected Database Error");
      throw err;
    }
    if (result.rows.length > 0) {
      res.status(200);
      res.send(JSON.stringify(result.rows));
    } else {
      res.status(404).send("No critical positions found");
    }
  });
});

router.get("/expectations", function (req, res) {
  var oid = req.query.oid;
  var query = "SELECT answers FROM answers WHERE oid = $1 AND sid = 2";

  client.query(query, [oid], function (err, result) {
    if (err) {
      console.log("Unexpected Database Error");
      throw err;
    }
    if (result.rows.length > 0) {
      const answers = result.rows[0].answers;
      var report_obj = new OrganizationReport(answers);
      report_obj.generateReport();
      
      const leadershipStyle = report_obj["leadershipStyle"];
      let expectations;
      if (leadershipStyle === leadership_style_match[0]) {
        expectations = "Steadiness";
      } else if (leadershipStyle === leadership_style_match[1]) {
        expectations = "Influence";
      } else if (leadershipStyle === leadership_style_match[2]) {
        expectations = "Dominant";
      } else if (leadershipStyle === leadership_style_match[3]) {
        expectations = "Conscientiousness";
      } else {
        expectations = "Dominant";
      }
      res.status(200).send(expectations);
    } else {
      res.status(404).send("No expectations found");
    }
  })
})

module.exports = router;
