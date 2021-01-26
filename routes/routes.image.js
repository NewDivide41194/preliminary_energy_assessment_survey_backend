const { imageController } = require('../controllers')
const express = require("express")
const router = express.Router()

router.post('/img', imageController.uploadImage);
router.get('/img/:fileName', imageController.getImage);
router.delete('/img/:fileName', imageController.deleteImage);

module.exports = router