const { questionService } = require("../services");
const response = require("../response/response");

const getQuestion = (req, res) => {
  questionService
    .getQuestion()
    .then((data) => {
      res.json(response({ success: true, payload: data }));
    })
    .catch((err) => res.json(response({ success: false, message: err })));
};

module.exports = { getQuestion };
