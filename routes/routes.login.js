const { loginController } = require('../controllers')
const express = require("express")
const router = express.Router()

router.post('/userlogin', loginController.logIn);

module.exports = router