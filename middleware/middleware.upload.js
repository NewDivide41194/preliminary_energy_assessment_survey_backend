const multer = require("multer");
const moment =require("moment")
const { nanoid } = require("nanoid");

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, "./public/uploads");
    },
    filename: function (req, file, callback) {
        console.log(moment(Date.now()).format("dd-mm-yy hh-mm-ss"));
        console.log(file);
        callback(null,nanoid()+moment(Date.now()).format("DD-mm-yy hh-mm-ss")+" "+file.originalname);
    }
});

const upload = multer({storage: storage}).array("file", 100)
// const upload = multer({storage: storage}).single("file")

module.exports = upload
