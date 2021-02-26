const mysql = require("mysql2");
const util = require("util");

require("dotenv").config();

const mypool = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    multipleStatements: true
});



const addUser = (userName, password, email, companyName, phoneNo) => {
    let query = util.promisify(mypool.query).bind(mypool);
    return query(`INSERT INTO PEA_Survey.tbl_login_users (user_name,password,email,active,user_level_id,company_name,phone_number)
  VALUES ('${userName}','${password}','${email}', 1, 2,'${companyName}','${phoneNo}')`);
};

const login = (email) => {
    let query = util.promisify(mypool.query).bind(mypool);
    return query(`SELECT * FROM PEA_Survey.tbl_login_users where email = '${email}';`);
};

const getBuilding = (buildinId) => {
    let query = util.promisify(mypool.query).bind(mypool);
    return query(`SELECT * FROM PEA_Survey.tbl_buildings where building_id = ${buildinId}`);
};

const getBuildingType = (buildinId) => {
    let query = util.promisify(mypool.query).bind(mypool);
    return query(`SELECT * FROM PEA_Survey.tbl_building_type;`);
};

const addBuilding = (buildingName, companyName, buildingTypeId, buildingType, active, createdDate, address, postalCode, country, comment, userId, surveyHeadersId, chiller, condenser, evaporator, coolingTower, avgPeople, totalMeetingRooms) => {
    let query = util.promisify(mypool.query).bind(mypool);
    return query(`Insert into PEA_Survey.tbl_buildings (building_name,company_name,building_type_id,building_type,active,created_date,created_by,address,postal_code,country,comment,user_id,survey_headers_id,chiller,condenser,evaporator,cooling_tower,avg_people,total_meeting_rooms)
  Values ('${buildingName}','${companyName}',${buildingTypeId},'${buildingType}',${active},'${createdDate}',${userId},'${address}','${postalCode}','${country}','${comment}',${userId},${surveyHeadersId},${chiller},${condenser},${evaporator},${coolingTower},${avgPeople},${totalMeetingRooms})
  `);
};

const getQuestion = (buildingId) => {
    let query = util.promisify(mypool.query).bind(mypool);
    return query(`
select distinct o.option_choice_id as oc,t1.survey_header_id,t1.survey_name,t1.remark,t1.survey_section_id,t1.section_name,t1.question_id as primary_question,t1.question_name,t1.input_types_id,t1.option_groups_id,t1.question_key,
  t1.option_choice_id as choices_id,t1.option_choice_name as choices,t1.categories as categories,sq.question_id,sq.sub_question_name,sq.question_id as sub_question_id,sq.input_type_id,o.option_choice_name,sq.sub_question_id,o.categories as cat, t1.unit_name, u.unit_name as subQuestionUnitName from
  (select h.survey_header_id,h.survey_name,s.survey_section_id,s.section_name,q.question_id,q.question_name,q.input_types_id,q.option_groups_id,q.question_key,
  o.option_choice_id,o.option_choice_name, o.categories,u.unit_name,h.remark from tbl_questions as q 
  left join tbl_option_choices as o  on q.question_id = o.questions_id  
    left join tbl_survey_sections as s on s.survey_section_id = q.survey_sections_id 
    left join tbl_survey_headers as h on h.survey_header_id = s.survey_headers_id 
    left join tbl_units as u on q.units_id = u.unit_id
     order by survey_section_id,option_choice_id) as t1
    left join tbl_sub_questions sq on sq.question_id = t1.question_id
    left join tbl_units u on sq.unit_id = u.unit_id
    left join tbl_option_choices o on  sq.sub_question_id = o.sub_question_id ;
    
    
    select ta.other,ta.option_choices_id as optionChoiceId,ta.users_id as userId,ta.questions_id as questionId,
    ta.survey_headers_id,ta.building_id,ta.keyValue,ta.country_id as countryId,ta.survey_section_id as surveySectionId,
        ta.sub_question_id as subQuestionId,ti.img_name as fileName from PEA_Survey.tbl_answers as ta
        left join PEA_Survey.tbl_img as ti on ta.building_id = ti.building_id and ta.questions_id = ti.question_id and ((ta.option_choices_id is null and ti.option_choices_id is null) or (ta.option_choices_id = ti.option_choices_id)) and ((ta.sub_question_id is null and ti.sub_question_id is null)||(ta.sub_question_id = ti.sub_question_id)) where ta.survey_headers_id = 1 and ta.building_id = ${buildingId};
    

 select chiller,condenser,evaporator,cooling_tower,total_meeting_rooms from tbl_buildings where building_id= ${buildingId};
  `);
};


// select ta.other,ta.option_choices_id as optionChoiceId,ta.users_id as userId,ta.questions_id as questionId,
// ta.survey_headers_id,ta.building_id,ta.keyValue,ta.country_id as countryId,ta.survey_section_id as surveySectionId,
//     ta.sub_question_id as subQuestionId,ti.img_name as fileName from PEA_Survey.tbl_answers as ta
//     left join PEA_Survey.tbl_img as ti on ta.building_id = ti.building_id and ta.questions_id = ti.question_id and ((ta.option_choices_id is null and ti.option_choices_id is null) or (ta.option_choices_id = ti.option_choices_id)) and ta.sub_question_id = ti.sub_question_id where ta.survey_headers_id = 1 and ta.building_id = 15

// select other,option_choices_id as optionChoiceId,users_id as userId,questions_id as questionId,file_name, survey_headers_id,building_id,keyValue,country_id as countryId,survey_section_id as surveySectionId,
// sub_question_id as subQuestionId from tbl_answers where survey_headers_id = 1 and building_id = ${buildingId};

// select * from tbl_questions as q left join tbl_option_choices as o  on q.question_id = o.questions_id
//       left join tbl_survey_sections as s on s.survey_section_id = q.survey_sections_id left join tbl_survey_headers as h
//         on h.survey_header_id = s.survey_headers_id where h.survey_header_id = survey_header_id and h.active = true;
//           select other,option_choices_id as optionChoiceId,users_id as userId,questions_id as questionId, survey_headers_id,building_id,keyValue from
//             tbl_answers where users_id = user_id and survey_headers_id = survey_header_id and building_id = buildingId;
//             select chiller,condenser,evaporator,cooling_tower,BMSInstalled from tbl_buildings where building_id=buildingId;

const addAnswer = (other, optionChoiceId, userId, questionId, survey_headers_id, building_id, answeredDate, keyValue, countryId, subQuestionId, surveySectionId, fileName) => {
console.log('++++++',fileName);
    let query = util.promisify(mypool.query).bind(mypool);

    return query(`INSERT INTO tbl_answers (other, option_choices_id, users_id, questions_id,survey_headers_id,building_id,answered_date,keyValue,country_id,sub_question_id,survey_section_id,file_name)  VALUES(?,?,?,?,?,?,?,?,?,?,?,?)`, [
        other,
        optionChoiceId,
        userId,
        questionId,
        survey_headers_id,
        building_id,
        answeredDate,
        keyValue,
        countryId,
        subQuestionId,
        surveySectionId,
        fileName
    ])
};


const deleteAnswer = (userId, survey_headers_id, building_id) => {
    let query = util.promisify(mypool.query).bind(mypool)
    return query(`delete from tbl_answers where users_id = ${userId} and survey_headers_id = ${survey_headers_id} and  building_id = ${building_id}`)
}

const addImg = (fileName, questionId, building_id, subQuestionId, optionChoiceId) => {
    let query = util.promisify(mypool.query).bind(mypool);

    return query(`INSERT INTO PEA_Survey.tbl_img (img_name, question_id, building_id, sub_question_id, option_choices_id)
    VALUES ( '${fileName}', '${questionId}', ${building_id} , ${subQuestionId}, ${optionChoiceId});`)
}

const deleteImg = (building_id) => {
    let query = util.promisify(mypool.query).bind(mypool)

    return query(`delete from PEA_Survey.tbl_img where building_id = ${building_id}`)
}

const getBuildingList = (userId) => {
    let query = util.promisify(mypool.query).bind(mypool)
    return query(`SELECT survey_header_id,survey_name,remark FROM tbl_survey_headers;
    SELECT building_id,building_name,building_type_id,tbt.building_type as building_type_name,tb.comment,tb.remark FROM PEA_Survey.tbl_buildings as tb 
    left join tbl_building_type as tbt on tb.building_type_id = tbt.id where user_id =  ${userId};`)
}

module.exports = {
    addUser,
    login,
    getBuilding,
    addBuilding,
    getQuestion,
    getBuildingType,
    addAnswer,
    deleteAnswer,
    getBuildingList,
    addImg,
    deleteImg
};
