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

// const allProductList = () => {
//   let query = util.promisify(mypool.query).bind(mypool);
//   return query(`SELECT * FROM tbl_login_users`);
// };

const addUser = (userName, password, email, companyName, phoneNo) => {
  let query = util.promisify(mypool.query).bind(mypool);
  return query(`INSERT INTO PEA_Survey.tbl_login_users (user_name,password,email,active,user_level_id,company_name,phone_number)
  VALUES ('${userName}','${password}','${email}', 1, 2,'${companyName}','${phoneNo}')`)
};

const login = (email) => {
  let query = util.promisify(mypool.query).bind(mypool);
  return query(`SELECT * FROM PEA_Survey.tbl_login_users where email = '${email}';`)
}

module.exports =
  {addUser,login}
