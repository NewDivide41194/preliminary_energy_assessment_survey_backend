const multer = require("multer");
const fs = require("fs");

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        let bodyData = JSON.parse(req.body.data);
        let val = bodyData[0].building_id
        if (!fs.existsSync(`./public/uploads/${val}`)) {
            fs.mkdirSync(`./public/uploads/${val}`)
        }
        // console.log("val in building is", val)
        callback(null, `./public/uploads/${val}/`);
    },
    filename: function (req, file, callback) {

        var ID = typeof req.body.id === "string" && req.body.id;

        if (typeof req.body.id !== "string") {
            for (i = 0; i < req.body.id.length; i ++) {
                ID = typeof req.body.id !== "string" ? req.body.id[i] : req.body.id;
            }
        }

        callback(null, ID + "_" + file.originalname);
    }
});

const upload = multer({storage: storage}).array("file", 100);
// const upload = multer({storage: storage}).single("file")

module.exports = upload;
