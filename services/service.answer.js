const { surveydb } = require("../database");

const addAnswer = (
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
) => {
  return surveydb.addAnswer(
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
};

module.exports = { addAnswer };
