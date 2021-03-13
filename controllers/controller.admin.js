const { questionService } = require("../services");
const response = require("../response/response");
var groupArray = require("group-array");
const fs = require("fs");

const downloadFile = (req, res) => {
  const buildingId = req.params.buildingId;
  const fileName = req.params.fileName;

  const DIR = `public/uploads/${buildingId}/`;

  fs.readdir("./" + DIR, (err, files) => {
    const searchedfile = files.filter((v) => v === fileName)[0];
    if (fileName !== searchedfile) {
      res.json(
        response({
          success: false,
          payload: null,
          message: "file do not exist!",
        })
      );
    } else {
      res.download(DIR + fileName);
    }
  });
};

module.exports = {
  downloadFile,
};
