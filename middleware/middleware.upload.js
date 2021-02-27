const multer = require("multer");
const moment = require("moment");

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "./public/uploads");
  },
  filename: function (req, file, callback) {
    var ID = typeof req.body.id === "string" && req.body.id;

    if (typeof req.body.id !== "string") {
      for (i = 0; i < req.body.id.length; i++) {
        ID = typeof req.body.id !== "string" ? req.body.id[i] : req.body.id;
      }
    }

    callback(null, Date.now() + "_" + ID + "_" + file.originalname);
  },
});

const upload = multer({ storage: storage }).array("file", 100);
// const upload = multer({storage: storage}).single("file")

module.exports = upload;
