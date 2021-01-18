const { surveydb } = require("../database");

const addUser = (userName, password, email, companyName, phoneNo) => {
    console.log("ddd is",userName, password, email, companyName, phoneNo)
  return surveydb.addUser(userName, password, email, companyName, phoneNo);
};

module.exports = { addUser };
