const {surveydb} = require("../database");

const getBuilding = (building_id) => {
    return surveydb.getBuilding(building_id);
};

const getBuildingType = (building_id) => {
    return surveydb.getBuildingType(building_id);
};

const getBuildingList = (userId) => {
    return surveydb.getBuildingList(userId)
}

const addBuilding = (buildingName, companyName, buildingTypeId, buildingType, active, createdDate, address, postalCode, country, comment, userId, surveyHeadersId, chiller, condenser, evaporator, coolingTower, avgPeople, totalMeetingRooms) => {
    return surveydb.addBuilding(buildingName, companyName, buildingTypeId, buildingType, active, createdDate, address, postalCode, country, comment, userId, surveyHeadersId, chiller, condenser, evaporator, coolingTower, avgPeople, totalMeetingRooms);
};

module.exports = {
    getBuilding,
    addBuilding,
    getBuildingList,
    getBuildingType
};
