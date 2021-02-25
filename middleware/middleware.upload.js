const multer = require("multer");

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, "./public/uploads");
    },
    filename: function (req, file, callback) {
        // console.log(req);
        callback(null, Date.now() + file.originalname);
    }
});

// const upload = multer({storage: storage}).array("multi-files", 10)
const upload = multer({storage: storage}).single("file")

module.exports = upload
