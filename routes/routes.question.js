const { questionController } = require('../controllers')
const express = require("express")
const router = express.Router()

router.get('/getQuestion/:buildinId', questionController.getQuestion);

module.exports = router