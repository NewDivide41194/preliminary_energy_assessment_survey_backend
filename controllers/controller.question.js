const { questionService } = require("../services");
const response = require("../response/response");
var groupArray = require("group-array");
const moment = require("moment");

const getQuestion = (req, res) => {
  let count = 0;

  // console.log("Ddddddddddddd",req.params)

  questionService
    .getQuestion()
    .then((data) => {
      let surveySections = Object.keys(
        groupArray(data, "survey_section_id")
      ).map((v, k) => {
        return groupArray(data, "survey_section_id")[v];
      });

      // let dd= surveySections[0].filter(d=> {
      //     return  d.device_type=='chiller 1' || d.device_type=='condenser 1' || d.device_type == 'evaporator 1' ||
      //     d.device_type == "cooling tower 1" || d.device_type == '1' || d.device_type == '7'})
      //    const rr=dd.map(c=>console.log((c.question_id)))
      // console.log(surveySections[0][0].device_type)

      let ans = [
        {
          survey_header_id: surveySections[0][0].survey_header_id,
          survey_name: surveySections[0][0].survey_name,
          remark: surveySections[0][0].remark,
          survey_sections: surveySections.map((section) => {
            count += Object.keys(
              groupArray(
                // section.filter((d) => d.input_types_id !== 8),
                section,
                "question_id"
              )
            ).length;
            return {
              survey_section_id: section[0].survey_section_id,
              section_name: section[0].section_name,
              questions: Object.keys(groupArray(section, "question_id"))
                .map((v, k) => {
                  return groupArray(section, "question_id")[v];
                })
              .map((v1, k1) => {
                return {
                  question_id: v1[0].question_id,
                  question_name: v1[0].question_name,
                  input_type_id: v1[0].input_types_id,
                  option_choices: v1.map((c) => {
                    return {
                      option_choice_id: c.option_choice_id,
                      option_choice_name: c.option_choice_name,
                    };
                  }),
                };
              }),
              section_question_count: Object.keys(
                groupArray(section, "question_id")
              ).map((v, k) => {
                return groupArray(section, "question_id")[v];
              }).length,
            };
          }),
          question_count: count,
        },
      ];

      // let tmparr = ans[0];
      // let test = 0;
      // tmparr.survey_sections.map((v, k) => {
      //     test += v.devicesQuestions[0].questions.length;
      // });

      // ans[0].question_count = test;

      res.json(response({ success: true, payload: ans }));
    })
    .catch((err) => res.json(response({ success: false, message: err })));
};

module.exports = { getQuestion };
