const {questionService} = require("../services");
const response = require("../response/response");
var groupArray = require("group-array");

const getQuestion = (req, res) => {
    let count = 0;
    const buildingId = req.params.buildingId;
    questionService.getQuestion(buildingId).then((data) => {
        const surveySections = Object.keys(groupArray(data[2][0].total_meeting_rooms > 0 ? data[0] : data[0].filter((v) => v.survey_section_id != 3), "survey_section_id")).map((v, k) => {
            return groupArray(data[0], "survey_section_id")[v];
        });
        let ans = [{
                survey_header_id: surveySections[0][0].survey_header_id,
                survey_name: surveySections[0][0].survey_name,
                remark: surveySections[0][0].remark,
                survey_sections: surveySections.map((section) => {
                    count += Object.keys(groupArray(section, "primary_question")).length;
                    return {
                        survey_section_id: section[0].survey_section_id,
                        section_name: section[0].section_name,
                        questions: Object.keys(groupArray(section, "primary_question")).map(
                            (v, k) => {
                                return groupArray(section, "primary_question")[v];
                            }
                        ).map(
                            (v1, k1) => {
                                if (v1[0].sub_question_id == null) {
                                    return {
                                        question_id: v1[0].primary_question,
                                        question_name: v1[0].question_name,
                                        input_type_id: v1[0].input_types_id,
                                        option_group_id: v1[0].option_groups_id,
                                        key: v1[0].question_key,
                                        unit: v1[0].unit_name,
                                        option_choices: v1.map((c) => {
                                            return {option_choice_id: c.choices_id, option_choice_name: c.choices};
                                        })
                                    };
                                } else if (v1[0].choices_id == null) {
                                    const dataResult1 = [];

                                    v1.map((c) => {
                                        const index = dataResult1.find((v) => v.option_choice_id == c.oc);
                                        if (index == null || index == undefined) {
                                            dataResult1.push({option_choice_id: c.oc, categories: c.cat});
                                        }
                                    });
                                    return {
                                        question_id: v1[0].primary_question,
                                        question_name: v1[0].question_name,
                                        input_type_id: v1[0].input_types_id,
                                        option_group_id: v1[0].option_groups_id,
                                        key: v1[0].question_key,
                                        unit: v1[0].unit_name,
                                        categories: dataResult1.filter((v) => v.option_choice_name != null) == "" ? null : dataResult1.filter((v) => v.option_choice_name != null),
                                        sub_questions: Object.keys(groupArray(v1, "sub_question_id")).map(
                                            (v2, k2) => {
                                                return groupArray(v1, "sub_question_id")[v2];
                                            }
                                        ).map(
                                            (v3, k3) => {
                                                const dataResult = [];
                                                v3.map((c) => {
                                                    const index = dataResult.find((v) => v.option_choice_id == c.oc);
                                                    if (index == null || index == undefined) {
                                                        dataResult.push({option_choice_id: c.oc, option_choice_name: c.option_choice_name});
                                                    }
                                                });
                                                return {
                                                    sub_question_id: v3[0].sub_question_id,
                                                    sub_question_name: v3[0].sub_question_name,
                                                    input_type_id: v3[0].input_type_id,
                                                    option_group_id: v3[0].option_group_id,
                                                    sub_question_unit: v3[0].subQuestionUnitName,
                                                    option_choices: dataResult.filter((v) => v.option_choice_name != null)
                                                };
                                            }
                                        )
                                    };
                                } else {
                                    const dataResult = [];
                                    const dataResult1 = [];

                                    v1.map((c) => {
                                        const index = dataResult.find((v) => v.option_choice_id == c.choices_id);
                                        if (index == null || index == undefined) {
                                            dataResult.push({option_choice_id: c.choices_id, option_choice_name: c.choices});
                                        }
                                    }),
                                    v1.map((c) => {
                                        const index = dataResult1.find((v) => v.option_choice_id == c.choices_id);
                                        if (index == null || index == undefined) {
                                            dataResult1.push({option_choice_id: c.choices_id, categories: c.categories});
                                        }
                                    });
                                    return {
                                        question_id: v1[0].primary_question,
                                        question_name: v1[0].question_name,
                                        input_type_id: v1[0].input_types_id,
                                        option_group_id: v1[0].option_groups_id,
                                        key: v1[0].question_key,
                                        unit: v1[0].unit_name,
                                        categories: dataResult1.filter((c) => c.categories != null),
                                        option_choices: dataResult.filter((c) => c.option_choice_name != null),
                                        sub_questions: Object.keys(groupArray(v1, "sub_question_id")).map(
                                            (v2, k2) => {
                                                return groupArray(v1, "sub_question_id")[v2];
                                            }
                                        ).map(
                                            (v3, k3) => {
                                                const dataResult = [];
                                                v1.map((c) => {
                                                    const index = dataResult.find((v) => v.option_choice_id == c.oc );
                                                    if (index == null || index == undefined) {
                                                        dataResult.push({option_choice_id: c.oc, option_choice_name: c.option_choice_name, sub_question_id: c.sub_question_id});
                                                    }
                                                });
                                                return {
                                                    sub_question_id: v3[0].sub_question_id,
                                                    sub_question_name: v3[0].sub_question_name,
                                                    input_type_id: v3[0].input_type_id,
                                                    option_group_id: v3[0].option_group_id,
                                                    sub_question_unit: v3[0].subQuestionUnitName,
                                                    option_choices: dataResult.filter((c) => c.option_choice_name != null && v3[0].sub_question_id == c.sub_question_id)
                                                };
                                            }
                                        )
                                    };
                                }
                            }
                        )
                    };
                }),
                answers: data[1],
                amountOfDevice: data[2],
                question_count: count
            },];

        res.json(response({success: true, payload: ans}));
    }).catch((err) => res.json(response({success: false, message: err.toString()})));
};

module.exports = {
    getQuestion
};
