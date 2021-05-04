const {surveydb} = require("../database");

const getBuilding = (building_id) => {
    return surveydb.getBuilding(building_id);
};

const getBuildingType = () => {
    return surveydb.getBuildingType();
};

const getBuildingList = (userId) => {
    return surveydb.getBuildingList(userId)
}

const addBuilding = (buildingName, companyName, buildingTypeId, buildingType, active, createdDate, address, postalCode, country, comment, userId, surveyHeadersId, chiller, condenser, evaporator, coolingTower, avgPeople, totalMeetingRooms) => {
    return surveydb.addBuilding(buildingName, companyName, buildingTypeId, buildingType, active, createdDate, address, postalCode, country, comment, userId, surveyHeadersId, chiller, condenser, evaporator, coolingTower, avgPeople, totalMeetingRooms);
};

const getAllBuilding = () => {
    return surveydb.getAllBuilding();
};
module.exports = {
    getBuilding,
    addBuilding,
    getBuildingList,
    getAllBuilding,
    getBuildingType
};
