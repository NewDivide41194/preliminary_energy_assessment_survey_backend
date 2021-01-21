const { buildingService } = require("../services");
const response = require("../response/response");

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

const addBuilding = (req, res) => {
    // console.log("req.body is",req.body)
  const buildingName = req.body.buildingName;
  const companyName = req.body.companyName;
  const buildingTypeId = req.body.buildingTypeId;
  const buildingType = req.body.buildingType;
  const remark = req.body.remark;
  const active = req.body.active;
  const createdDate = req.body.createdDate;
  const createdBy = req.body.createdBy;
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
  const totalQuestions = req.body.totalQuestions;
  // const BMSInstalled = req.body.BMSInstalled;
  // const totalRestaurant = req.body.totalRestaurant;
  const avgPeople = req.body.avgPeople;
  const totalMeetingRooms = req.body.totalMeetingRooms;

  buildingService.addBuilding(buildingName,
    companyName,
    buildingTypeId,
    buildingType,
    active,
    createdDate,
    createdBy,
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
    totalQuestions,
    avgPeople,
    totalMeetingRooms).then((data) => {
      res.json(
        response({
          success: true,
          message: "Inserted!",
          payload: data,
        })
      );
    })
    .catch((err) => {

      res.json(response({ success: false, message: err }));
    });

};

module.exports = { getBuilding, addBuilding, getBuildingType };
