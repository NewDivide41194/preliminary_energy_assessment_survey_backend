const {surveydb} = require("../database");

const getQuestion = (buildingId) => { 
    return surveydb.getQuestion(buildingId)
};

module.exports = {
    getQuestion
};
