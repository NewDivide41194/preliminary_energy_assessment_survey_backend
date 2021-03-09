const userController = require("./controller.user");
const loginController = require("./controller.login");
const buildingController = require("./controller.building");
const questionController = require("./controller.question");
const imageController = require("./controller.upload");
const answerController = require("./controller.answer");
const adminController = require("./controller.admin")

module.exports = {
  userController,
  loginController,
  buildingController,
  questionController,
  imageController,
  answerController,
  adminController
};
