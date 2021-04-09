const { buildingService } = require("../services");
const response = require("../response/response");
const moment = require("moment");
const { sendEventsToAll } = require("../middleware/middleware.eventHandler");

const getBuilding = (req, res) => {
  const buildingId = req.params.buildingId;
  buildingService
    .getBuilding(buildingId)
    .then((data) => {
      res.json(response({ success: true, payload: data }));
    })
    .catch((err) => res.json(response({ success: false, message: err })));
};

const getBuildingType = (req, res) => {
  buildingService
    .getBuildingType()
    .then((data) => {
      res.json(response({ success: true, payload: data }));
    })
    .catch((err) => res.json(response({ success: false, message: err })));
};

const getBuildingList = (req, res) => {
  const userId = req.params.userId;

  buildingService
    .getBuildingList(userId)
    .then((data) => {
      let ans = [
        {
          survey_header: data[0],
          building_info: data[1],
        },
      ];
      res.json(response({ success: true, payload: ans }));
    })
    .catch((err) => res.json(response({ success: false, message: err })));
};

const getAllBuilding = (req, res) => {
  const userId = req.params.userId;
  buildingService
    .getAllBuilding()
    .then((data) => res.json(response({ success: true, payload: data })))
    .catch((err) => res.json(response({ success: false, message: err })));
};

const addBuilding = (req, res,next) => {
  const buildingName = req.body.buildingName;
  const companyName = req.body.companyName;
  const buildingTypeId = req.body.buildingTypeId;
  const buildingType = req.body.buildingType;
  const active = req.body.active;
  const createdDate = moment(Date.now()).format("YYYY-MM-DD");
  const address = req.body.address;
  const postalCode = req.body.postalCode;
  const country = req.body.country;
  const comment = req.body.comment;
  const userId = req.body.userId;
  const surveyHeadersId = req.body.surveyHeadersId;
  const chiller = req.body.chiller;
  const condenser = req.body.condenser;
  const evaporator = req.body.evaporator;
  const coolingTower = req.body.coolingTower;
  const avgPeople = req.body.avgPeople;
  const totalMeetingRooms =
    req.body.totalMeetingRooms == undefined ? null : req.body.totalMeetingRooms;

  buildingService
    .addBuilding(
      buildingName,
      companyName,
      buildingTypeId,
      buildingType,
      active,
      createdDate,
      address,
      postalCode,
      country,
      comment,
      userId,
      surveyHeadersId,
      chiller,
      condenser,
      evaporator,
      coolingTower,
      avgPeople,
      totalMeetingRooms
    )
    .then((data) => {
      const BuildingData = {
        building_id: data.insertId,
        building_name: buildingName,
        building_type_name: buildingType.label,
        createdBy: userId,
        createdDate: createdDate
      }
      sendEventsToAll(BuildingData)
      res.json(
        response({ success: true, message: "Inserted!", payload: data })
      );
    })
  
    .catch((err) => {
      console.log(err);
      next(err)
      res.json(response({ success: false, message: err }));
    });
};

module.exports = {
  getBuilding,
  addBuilding,
  getBuildingList,
  getBuildingType,
  getAllBuilding
};
