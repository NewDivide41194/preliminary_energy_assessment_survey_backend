const {surveydb} = require("../database");

const addAnswer = (other, optionChoiceId, userId, questionId, survey_headers_id, building_id, answeredDate, keyValue, countryId, subQuestionId, surveySectionId, fileName) => {
    return surveydb.addAnswer(other, optionChoiceId, userId, questionId, survey_headers_id, building_id, answeredDate, keyValue, countryId, subQuestionId, surveySectionId, fileName);
};

const deleteAnswer = (userId, survey_headers_id, building_id) => {
    return surveydb.deleteAnswer(userId, survey_headers_id, building_id)
}

const addImg = (fileName, questionId, building_id, subQuestionId, optionChoiceId) => {
    return surveydb.addImg(fileName, questionId, building_id, subQuestionId, optionChoiceId)
}

const deleteImg = (building_id) => {
    return surveydb.deleteImg(building_id)
}

module.exports = {
    addAnswer,
    deleteAnswer,
    addImg,
    deleteImg
};
