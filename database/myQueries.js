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
  VALUES ('${userName}','${password}','${email}', 1, 2,'${companyName}','${phoneNo}')`);
};

const login = (email) => {
  let query = util.promisify(mypool.query).bind(mypool);
  return query(
    `SELECT * FROM PEA_Survey.tbl_login_users where email = '${email}';`
  );
};

const getBuilding = (buildinId) => {
  let query = util.promisify(mypool.query).bind(mypool);
  return query(
    `SELECT * FROM PEA_Survey.tbl_buildings where building_id = ${buildinId}`
  );
};

const addBuilding = (buildingName,companyName,buildingTypeId,buildingType,remark,active,createdDate,createdBy,address,postalCode,country,comment,userId,surveyHeadersId,chiller,condenser,evaporator,coolingTower,totalQuestions,BMSInstalled,totalRestaurant,avgPeople,totalMeetingRooms) => {
  let query = util.promisify(mypool.query).bind(mypool);
  return query (`Insert into PEA_Survey.tbl_buildings (building_name,company_name,building_type_id,building_type,remark,active,created_date,created_by,address,postal_code,country,comment,user_id,survey_headers_id,chiller,condenser,evaporator,cooling_tower,total_questions,BMSInstalled,total_restaurant,avg_people,total_meeting_rooms)
  Values ('${buildingName}','${companyName}',${buildingTypeId},'${buildingType}','${remark}',${active},'${createdDate}',${createdBy},'${address}','${postalCode}','${country}','${comment}',${userId},${surveyHeadersId},${chiller},${condenser},${evaporator},${coolingTower},${totalQuestions},${BMSInstalled},${totalRestaurant},${avgPeople},${totalMeetingRooms})
  `)
}

const getQuestion = () => {
  let query = util.promisify(mypool.query).bind(mypool)
  return query (`SELECT * FROM PEA_Survey.tbl_survey_headers as tsh 
  left join tbl_survey_sections as tss on tsh.survey_header_id = tss.survey_headers_id;`)
}

module.exports = { addUser, login, getBuilding, addBuilding, getQuestion };
