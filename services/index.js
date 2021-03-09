// const serviceProduct=require("./service.products")
const userService = require("./service.user");
const loginService = require("./service.login");
const buildingService = require("./service.building");
const questionService = require("./service.question");
const answerService = require("./service.answer")
const adminService = require("./service.admin")

module.exports = {
  userService,
  loginService,
  buildingService,
  questionService,
  answerService,
  adminService
};
