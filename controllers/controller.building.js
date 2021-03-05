const {buildingService} = require("../services");
const response = require("../response/response");
const moment = require('moment')

const getBuilding = (req, res) => {
    const buildingId = req.params.buildingId;

    buildingService.getBuilding(buildingId).then((data) => {
        res.json(response({success: true, payload: data}));
    }).catch((err) => res.json(response({success: false, message: err})));
};

const getBuildingType = (req, res) => {

    buildingService.getBuildingType().then((data) => {
        res.json(response({success: true, payload: data}));
    }).catch((err) => res.json(response({success: false, message: err})));
};

const getBuildingList = (req, res) => {
    const userId = req.params.userId

    buildingService.getBuildingList(userId).then((data) => {
        let ans = [{
            survey_header: data[0],
            building_info : data[1]
        }]
        res.json(response({success: true, payload: ans}));
    }).catch((err) => res.json(response({success: false, message: err})));
};

const addBuilding = (req, res) => { // console.log("req.body is",moment(Date.now()).format("YYYY-MM-DD"))
    const buildingName = req.body.buildingName;
    const companyName = req.body.companyName;
    const buildingTypeId = req.body.buildingTypeId;
    const buildingType = req.body.buildingType;
    // const remark = req.body.remark;
    const active = req.body.active;
    const createdDate = moment(Date.now()).format("YYYY-MM-DD")
    // const createdBy = req.body.createdBy;
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
    // const totalQuestions = req.body.totalQuestions;
    // const BMSInstalled = req.body.BMSInstalled;
    // const totalRestaurant = req.body.totalRestaurant;
    const avgPeople = req.body.avgPeople;
    const totalMeetingRooms = req.body.totalMeetingRooms == undefined ? null : req.body.totalMeetingRooms;
    // console.log("totalMeetingRooms is ===>",totalMeetingRooms)

    buildingService.addBuilding(buildingName, companyName, buildingTypeId, buildingType, active, createdDate, address, postalCode, country, comment, userId, surveyHeadersId, chiller, condenser, evaporator, coolingTower, avgPeople, totalMeetingRooms).then((data) => {
        res.json(response({success: true, message: "Inserted!", payload: data}));
    }).catch((err) => {

        res.json(response({success: false, message: err}));
    });

};

module.exports = {
    getBuilding,
    addBuilding,
    getBuildingList,
    getBuildingType
};
