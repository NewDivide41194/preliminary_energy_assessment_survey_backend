const { questionController } = require('../controllers')
const express = require("express")
const router = express.Router()

router.post('/getQuestion', questionController.getQuestion);

module.exports = router