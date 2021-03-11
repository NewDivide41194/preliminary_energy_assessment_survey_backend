const express = require("express");
const router = express.Router();
const { adminController } = require("../controllers");

router.get("/downloadFile/:buildingId/:fileName", adminController.downloadFile);

module.exports = router;
