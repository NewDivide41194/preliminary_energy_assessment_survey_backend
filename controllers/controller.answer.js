const {answerService} = require("../services");
const response = require("../response/response");
const {upload} = require("../middleware")
const moment = require("moment");

const addAnswer = (req, res) => {
    // upload(req, res, err => {
        console.log("req.file is", req.body)
        console.log("req.file is", req)
        let targetCount = req.body.data.length;

        let count = 0;
        let queryLoop = new Promise((resolve, reject) => { // console.log("req.body is", req.body.data[0])
            answerService.deleteAnswer(req.body.data[0].userId, req.body.data[0].survey_headers_id, req.body.data[0].building_id);
            req.body.data.map(async (data) => {

                let optionChoiceId = data.optionChoiceId;
                let other = data.other;
                let userId = data.userId;
                let questionId = data.questionId;
                let survey_headers_id = data.survey_headers_id;
                let building_id = data.building_id;
                let keyValue = data.keyValue;
                let answeredDate = moment.utc(new Date()).local().format("YYYY-MM-DD HH:mm:ss");
                // let totalQuestionCount = req.body.total;
                // let buildingType = req.body.buildingType;
                let countryId = data.countryId;
                let subQuestionId = data.subQuestionId;
                let surveySectionId = data.surveySectionId;
                let fileName = req.files == undefined ? null : req.files.length > 0 ? req.files[0].filename : null;
                try {
                    let addData = await answerService.addAnswer(other, optionChoiceId, userId, questionId, survey_headers_id, building_id, answeredDate, keyValue, countryId, subQuestionId, surveySectionId, fileName);
                    count++;
                    if (count == targetCount) 
                        resolve({answeredCount: count});
                    


                } catch (error) {
                    console.log("error add Answer ", error.toString());
                }
            })
        });


        queryLoop.then((data) => {
            res.json(response({success: true, payload: data}));
        }).catch((err) => res.json(response({success: false, message: err.toString()})));
    // });
};

module.exports = {
    addAnswer
};
