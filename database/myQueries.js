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
  return query (`
  select * from PEA_Survey.tbl_questions as q left join tbl_option_choices as o  on q.question_id = o.questions_id
        left join PEA_Survey.tbl_survey_sections as s on s.survey_section_id = q.survey_sections_id left join tbl_survey_headers as h
          on h.survey_header_id = s.survey_headers_id where h.survey_header_id = survey_header_id and h.active = true;`)
}

// select * from tbl_questions as q left join tbl_option_choices as o  on q.question_id = o.questions_id
//       left join tbl_survey_sections as s on s.survey_section_id = q.survey_sections_id left join tbl_survey_headers as h
//         on h.survey_header_id = s.survey_headers_id where h.survey_header_id = survey_header_id and h.active = true;
//           select other,option_choices_id as optionChoiceId,users_id as userId,questions_id as questionId, survey_headers_id,building_id,keyValue from  
//             tbl_answers where users_id = user_id and survey_headers_id = survey_header_id and building_id = buildingId;
//             select chiller,condenser,evaporator,cooling_tower,BMSInstalled from tbl_buildings where building_id=buildingId;




module.exports = { addUser, login, getBuilding, addBuilding, getQuestion };
