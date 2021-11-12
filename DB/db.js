const mysql = require("mysql2/promise");
require("dotenv").config();

const { database, host, user, password } = process.env;

const db = mysql.createPool({
  database,
  host,
  user,
  password,
});

module.exports = {
  db,
};
