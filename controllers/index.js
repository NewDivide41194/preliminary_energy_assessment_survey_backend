const userController = require("./controller.user");
const loginController = require("./controller.login");
const buildingController = require("./controller.building");
const questionController = require("./controller.question");
const imageController=require("./controller.upload")

module.exports = {
  userController,
  loginController,
  buildingController,
  questionController,
  imageController
};
