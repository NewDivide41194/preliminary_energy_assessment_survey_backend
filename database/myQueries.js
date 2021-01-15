const mysql = require("mysql2");
const util = require("util");

require("dotenv").config();

const mypool = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  multipleStatements: true,
});

const allProductList = () => {
  let query = util.promisify(mypool.query).bind(mypool);
  return query(`SELECT * FROM tbl_login_users`);
};

module.exports =
  {allProductList}
