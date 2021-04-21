const { buildingController } = require('../controllers')
const express = require("express")
const router = express.Router()

// router.get('/getBuilding/:buildingId', buildingController.getBuilding);
router.post('/addBuilding', buildingController.addBuilding)
router.get('/getBuildingType', buildingController.getBuildingType);
router.get('/getBuildingList/:userId', buildingController.getBuildingList)
router.get('/getAllBuilding', buildingController.getAllBuilding)


module.exports = router