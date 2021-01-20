const { surveydb } = require("../database");

const getBuilding = (building_id) => {
  return surveydb.getBuilding(building_id);
};

const addBuilding = (
  buildingName,
  companyName,
  buildingTypeId,
  buildingType,
  remark,
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
  BMSInstalled,
  totalRestaurant,
  avgPeople,
  totalMeetingRooms
) => {
  console.log("service data is", buildingName,
  companyName,
  buildingTypeId,
  buildingType,
  remark,
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
  BMSInstalled,
  totalRestaurant,
  avgPeople,
  totalMeetingRooms)
  return surveydb.addBuilding(
    buildingName,
    companyName,
    buildingTypeId,
    buildingType,
    remark,
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
    BMSInstalled,
    totalRestaurant,
    avgPeople,
    totalMeetingRooms
  );
};

module.exports = { getBuilding, addBuilding };
