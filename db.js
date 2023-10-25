const Pool = require("pg").Pool;
const pool = new Pool({
  user: "postgres",
  password: "529376",
  host: "localhost",
  port: 5432,
  database: "authtodo",
});

module.exports = pool;
