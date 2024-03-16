// Setting up PostgreSQL connection
const database = require("pg");

// Referenced: https://node-postgres.com/apis/client
const client = new database.Client({
  host: "localhost",
  user: "postgres",
  password: "T@L3ntG1ft",
  port: 5432,
  database: "talentgift",
});
client.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

module.exports = client;
