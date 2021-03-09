const express = require("express");
const router = express.Router();
const { adminController } = require("../controllers");

router.get("/getAnswerForAdmin/:user_id", adminController.getAnswerForAdmin);

module.exports = router;
