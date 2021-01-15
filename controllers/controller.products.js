const service = require("../services");
const response = require("../response/response");

const getProductsList = (req, res) => {
  return service
    .serviceProduct()
    .then((data) => {
      return res.json(response({ payload: data }));
    })
    .catch((err) => {
      throw err
    });
};

module.exports = getProductsList;
