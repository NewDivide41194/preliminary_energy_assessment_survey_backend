const { imageController } = require('../controllers')
const express = require("express")
const router = express.Router()

router.post('/img/:building_id', imageController.uploadImage);
router.get('/img/:fileName', imageController.getImage);
router.delete('/img/:fileName', imageController.deleteImage);
router.put('/imgs/remove/:building_id',imageController.removeImg)

module.exports = router