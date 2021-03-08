const {surveydb} = require("../database");
const fs = require("fs");
const path = require("path");

const addAnswer = (other, optionChoiceId, userId, questionId, survey_headers_id, building_id, answeredDate, keyValue, countryId, subQuestionId, surveySectionId, fileName) => {
    return surveydb.addAnswer(other, optionChoiceId, userId, questionId, survey_headers_id, building_id, answeredDate, keyValue, countryId, subQuestionId, surveySectionId, fileName);
};

const deleteAnswer = (userId, survey_headers_id, building_id) => {
    return surveydb.deleteAnswer(userId, survey_headers_id, building_id);
};

const addImg = (fileName, questionId, building_id, subQuestionId, optionChoiceId) => {
    return surveydb.addImg(fileName, questionId, building_id, subQuestionId, optionChoiceId);
};

const deleteFiles = (building_id) => {
  console.log("building id is",building_id)
    const DIR = `public/uploads/${building_id}/`;
    surveydb.getAllAnswers(building_id).then((data) => { // console.log("Delete");
        fs.readdir("./" + DIR, (err, files) => {
            if (err) {
                console.log(err);
            }
            // console.log("files is is is",files)
            // console.log(files,data.map(v=>v.file_name));
            const dataFile = data.map((v) => v.file_name);
            InequalFiles = files.filter((val) => ! dataFile.includes(val));
            console.log("InequalFiles ==>",InequalFiles);
            if (InequalFiles.length > 0) {
                const fileDir = (fileName) => path.join("./" + DIR, fileName);
                InequalFiles.map((v) => fs.unlinkSync(fileDir(v)));
            }
        });
    });
};

module.exports = {
    addAnswer,
    deleteAnswer,
    addImg,
    deleteFiles
};
