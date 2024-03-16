/* This file contains a function to add members (employees and managers) to the organization 
by parsing an Excel file containing member data */

import readXlsxFile from "read-excel-file";

import config from "../../../config";

/**
 * Add members to an organization through parsing an Excel file containing member data. Uses
 * read-excel-file dependency (documentation: https://www.npmjs.com/package/read-excel-file).
 * @param {File} file - Excel file containing member data to parse
 * @param {string} oid - Organization ID to add members to
 */
async function addMembers(file, oid) {
  const questions = [
    "This position has a critical impact in operational continuity and corporate strategic development.",
    "Highly specialized position requiring expertise in rare tools or processes; demands intensive internal training due to limited availability and high skill requirements in the market.",
    "Decisions impact company revenue, resource allocation, and area budgets; influence functional processes and business structure.",
  ];

  // Retrieve Excel spreadsheet
  const schema = {
    "First Name": {
      prop: "firstname",
      type: String,
      required: true,
    },
    "Last Name": {
      prop: "lastname",
      type: String,
      required: true,
    },
    Email: {
      prop: "email",
      type: String,
      required: true,
    },
    Position: {
      prop: "position",
      type: String,
      required: true,
    },
  };

  let questionNumber = 1;
  for (const question of questions) {
    schema[question] = {
      prop: `question${questionNumber}`,
      type: Number,
      required: true,
    };
    questionNumber++;
  }
  const { rows, errors } = await readXlsxFile(file, { schema });
  console.log("Errors", errors);
  if (errors.length !== 0) {
    // Errors given as an object as per the read-excel-file package documentation: { row, column, error, reason?, value?, type? }
    return { status: 1, errors: errors };
  }
  console.log(rows);
  // Get user emails (and oid associated with email) in the database (to determine if a new account needs to be created)
  const getEmails = await fetch(`http://${config.hostname}/emails`);
  const emailsInDB = await getEmails.json();
  console.log(emailsInDB);

  const requests = []; // array of Promises
  for (const member of rows) {
    console.log(member);
    if (emailsInDB.includes(member.email)) {
      // Member in the database, update their organization
      const request = fetch(`http://${config.hostname}/members`, {
        method: "PATCH",
        body: JSON.stringify({
          email: member.email,
          criticalPositions: [
            member.question1,
            member.question2,
            member.question3,
          ],
          oid: oid,
        }),
      });
      requests.push(request);
    } else {
      // Member not found in the database (add to database)
      const request = fetch(`http://${config.hostname}/members`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstname: member.firstname,
          lastname: member.lastname,
          email: member.email,
          position: member.position,
          criticalPositions: [
            member.question1,
            member.question2,
            member.question3,
          ],
          oid,
        }),
      });
      requests.push(request);
    }
  }
  await Promise.all(requests); // Wait for all requests to be resolved before proceeding
  console.log("All members added!");
  return { status: 0, errors: [] };
}

export { addMembers };
