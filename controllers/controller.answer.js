const { answerService } = require("../services");
const response = require("../response/response");
const { upload } = require("../middleware");
const moment = require("moment");

const addAnswer = (req, res) => {
  // console.log(upload(req,res,(err)=>{console.log("hello");}));
  upload(req, res, (err) => {
    console.log(req.files.map((v) => v.filename));
    let modifiedFiles = req.files;
    let bodyData = JSON.parse(req.body.data);
    let targetCount = bodyData.length;
    let count = 0;
    console.log(bodyData);
    console.log(bodyData.map((v2,k2)=>v2.fileName));
    const userId = bodyData[0].userId;
    const survey_header_id = bodyData[0].survey_headers_id;
    const building_id = bodyData[0].building_id;
    let queryLoop = new Promise((resolve, reject) => {
      answerService.deleteAnswer(userId, survey_header_id, building_id);
      answerService.deleteImg(bodyData[0].building_id);
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
        let j = 0;
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
          const fileLength = bodyData.filter((v) => v.fileName !== false)
            .length;

          if (k <= fileLength) {
            console.log(modifiedFiles.map((v1, k1) => v1.filename)[k]);
            answerService.addImg(
              modifiedFiles.map((v1, k1) => v1.filename)[k],
              questionId,
              building_id,
              subQuestionId,
              optionChoiceId
            );
          }
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
        }
      });
    });

    queryLoop
      .then((data) => {
        res.json(response({ success: true, payload: data }));
      })
      .catch((err) =>
        res.json(response({ success: false, message: err.toString() }))
      );
  });
};

module.exports = {
  addAnswer,
};

// const { answerService } = require("../services");
// const response = require("../response/response");
// const { upload } = require("../middleware");
// const moment = require("moment");

// const addAnswer = (req, res) => {
//   // console.log(upload(req,res,(err)=>{console.log("hello");}));
//   upload(req, res, (err) => {
//     let modifiedFiles = req.files;
//     let bodyData = JSON.parse(req.body.data);
//     let targetCount = bodyData.length;
//     let count = 0;
//     let queryLoop = new Promise((resolve, reject) => {
//       answerService.deleteAnswer(
//         bodyData[0].userId,
//         bodyData[0].survey_headers_id,
//         bodyData[0].building_id
//       );
//       bodyData.map(async (data) => {
//         let optionChoiceId = data.optionChoiceId;
//         let other = data.other;
//         let userId = data.userId;
//         let questionId = data.questionId;
//         let survey_headers_id = data.survey_headers_id;
//         let building_id = data.building_id;
//         let keyValue = data.keyValue;
//         let answeredDate = moment
//           .utc(new Date())
//           .local()
//           .format("YYYY-MM-DD HH:mm:ss");
//         let countryId = data.countryId;
//         let subQuestionId = data.subQuestionId;
//         let surveySectionId = data.surveySectionId;
//         // let fileName = data.fileName;
//         let fileName = modifiedFiles;
//         if (fileName == undefined) {
//           try {
//             let addData = await answerService.addAnswer(
//               other,
//               optionChoiceId,
//               userId,
//               questionId,
//               survey_headers_id,
//               building_id,
//               answeredDate,
//               keyValue,
//               countryId,
//               subQuestionId,
//               surveySectionId
//             );
//             count++;
//             if (count == targetCount) resolve({ answeredCount: count });
//           } catch (error) {
//             console.log("error add Answer ", error.toString());
//           }
//         } else {
//           answerService.deleteImg(bodyData[0].building_id);
//           for (let i = 0; i < fileName.length; i++) {
//             answerService.addImg(
//               fileName[i].filename,
//               questionId,
//               building_id,
//               subQuestionId,
//               optionChoiceId
//             );
//           }
//           try {
//             let addData = await answerService.addAnswer(
//               other,
//               optionChoiceId,
//               userId,
//               questionId,
//               survey_headers_id,
//               building_id,
//               answeredDate,
//               keyValue,
//               countryId,
//               subQuestionId,
//               surveySectionId
//             );
//             count++;
//             if (count == targetCount) resolve({ answeredCount: count });
//           } catch (error) {
//             console.log("error add Answer ", error.toString());
//           }
//         }
//       });
//     });

//     queryLoop
//       .then((data) => {
//         res.json(response({ success: true, payload: data }));
//       })
//       .catch((err) =>
//         res.json(response({ success: false, message: err.toString() }))
//       );
//   });
// };

// module.exports = {
//   addAnswer,
// };
