const { questionService } = require("../services");
const response = require("../response/response");
var groupArray = require("group-array");
const fs = require("fs");
require("dotenv").config();

const downloadFile = (req, res) => {
  const buildingId = req.params.buildingId;
  const fileName = req.params.fileName;
  
  const DIR = `public/uploads/${buildingId}/`;
  const Home = `http://${process.env.DB_HOST}:3001/uploads/${buildingId}/`;

  fs.readdir("./" + DIR, (err, files) => {
    const searchedfile = files.filter((v) => v === fileName);
    console.log(fileName);
    console.log(files);
    console.log(searchedfile);
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
