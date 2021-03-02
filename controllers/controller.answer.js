const { answerService } = require("../services");
const response = require("../response/response");
const { upload } = require("../middleware");
const moment = require("moment");

const addAnswer = (req, res) => {
  upload(req, res, (err) => {
    let modifiedFiles = req.files;
    let bodyData = JSON.parse(req.body.data);
    let targetCount = bodyData.length;
    let count = 0;
    const userId = bodyData[0].userId;
    const survey_header_id = bodyData[0].survey_headers_id;
    const building_id = bodyData[0].building_id;
    let queryLoop = new Promise((resolve, reject) => {
      answerService.deleteAnswer(userId, survey_header_id, building_id);
      bodyData.map(async (data, k) => {
        let optionChoiceId = data.optionChoiceId;
        let other = data.other;
        let userId = data.userId;
        let questionId = data.questionId;
        let survey_headers_id = data.survey_headers_id;
        let building_id = data.building_id;
        let keyValue = data.keyValue;
        let answeredDate = moment
          .utc(new Date())
          .local()
          .format("YYYY-MM-DD HH:mm:ss");
        let countryId = data.countryId;
        let subQuestionId = data.subQuestionId;
        let surveySectionId = data.surveySectionId;

        // let fileName = modifiedFiles;

        let fileName = data.fileName;

        if (fileName == undefined || fileName === false) {
          try {
            await answerService.addAnswer(
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
              surveySectionId
            );
            count++;
            if (count == targetCount) resolve({ answeredCount: count });
          } catch (error) {
            console.log("error add Answer ", error.toString());
          }
        } else {
          if (data.file) {
            console.log(req.body.id);
            data.fileName.map((v1, k1) => {
              const ID = req.body.id;
              const file_name = typeof ID === "string" ? ID+"_"+v1 : ID[k] + "_" + v1;
              try {
                answerService.addAnswer(
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
                  file_name
                );
                count++;
                if (count == targetCount) resolve({ answeredCount: count });
              } catch (error) {
                console.log("error add Answer ", error.toString());
              }
            });
            answerService.deleteFiles();

          } else {
            data.fileName.map((v1, k1) => {
              try {
                answerService.addAnswer(
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
                  v1
                );
                count++;
                if (count == targetCount) resolve({ answeredCount: count });
              } catch (error) {
                console.log("error add Answer ", error.toString());
              }
            });
          }
        }
      });
    });
    queryLoop.then(res.json(response({ success: true, payload: null })));
  });
};

module.exports = {
  addAnswer,
};
