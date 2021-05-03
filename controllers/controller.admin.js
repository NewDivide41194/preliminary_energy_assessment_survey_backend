const { questionService } = require("../services");
const response = require("../response/response");
var groupArray = require("group-array");
const fs = require("fs");
require("dotenv").config();

const downloadFile = (req, res) => {
  const buildingId = req.params.buildingId;
  const fileName = req.params.fileName;
  const baseURL="http://localhost:3001"
  // const baseURL="http://172.105.123.57:3001"

  const DIR = `public/uploads/${buildingId}/`;
  const Home = `${baseURL}/uploads/${buildingId}/`;

  fs.readdir("./" + DIR, (err, files) => {
    const searchedfile = files?files.filter((v) => v === fileName)[0]:[];
    if (fileName !== searchedfile || searchedfile === undefined) {
      res.json(
        response({
          success: false,
          payload: null,
          message: "file do not exist!",
        })
      );
    } else {
      res.json(
        response({
          success: true,
          payload: Home + searchedfile,
          message: "success!",
        })
      );
    }
  });
};

module.exports = {
  downloadFile,
};
