const {surveydb} = require("../database");

const getQuestion = (userId,buildingId) => { 
    return surveydb.getQuestion(userId,buildingId)
};

module.exports = {
    getQuestion
};
