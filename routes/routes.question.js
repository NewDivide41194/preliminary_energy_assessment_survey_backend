const { questionController } = require('../controllers')
const express = require("express")
const router = express.Router()

router.get('/getQuestion/:userId/:buildingId', questionController.getQuestion);

module.exports = router