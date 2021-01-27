const express = require("express");
const router = express.Router();
const { answerController } = require("../controllers");

router.post("/addAnswer", answerController.addAnswer);

module.exports = router;
