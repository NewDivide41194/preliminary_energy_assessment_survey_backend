const { answerService } = require("../services");
const response = require("../response/response");
const { upload } = require("../middleware");
const Pusher = require("pusher");
const moment = require("moment");
const { uploadImage } = require("./controller.upload");

const addAnswer = (req, res) => {
  // uploadImage()
  let percent = 0;
  const pusher = new Pusher({
    appId: "1172574",
    key: "df13a26a535bfa6fc899",
    secret: "55029222960c87cf9197",
    cluster: "us2",
    useTLS: true,
  });
  const interval = setInterval(() => {
    percent += 10;
    pusher.trigger("upload", "progress", {
      percent,
    });
    if (percent === 100) clearInterval(interval);
  }, 200);
  console.log(percent);

  upload(req, res, (err) => {
    let modifiedFiles = req.files;
    let bodyData = JSON.parse(req.body.data);
    let targetCount = bodyData.length;
    let count = 0;
    const userId = bodyData[0].userId;
    const survey_header_id = bodyData[0].survey_headers_id;
    const building_id = bodyData[0].building_id;
    let i = 0;

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
        let j = k;

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
          data.fileName.map((v1, k1) => {
            try {
              v1.length > 41 && v1.slice(8).startsWith("-")
                ? i
                : j == k
                ? i++
                : i;

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
                v1.length > 41 && v1.slice(8).startsWith("-")
                  ? v1
                  : typeof req.body.id == "string"
                  ? req.body.id + "_" + v1
                  : req.body.id[i - 1] + "_" + v1,
                j++
              );
              count++;
              if (count == targetCount) resolve({ answeredCount: count });
            } catch (error) {
              console.log("error add Answer with Img ", error.toString());
            }
          });
        }
      });
    });
    queryLoop.then(res.json(response({ success: true, payload: null })));
    console.log(req.files);
    if (req.files.length === 0) {
      console.log("No Files");
      return;
    } else {
      answerService.deleteFiles(building_id);
    }
  });
};

module.exports = {
  addAnswer,
};
