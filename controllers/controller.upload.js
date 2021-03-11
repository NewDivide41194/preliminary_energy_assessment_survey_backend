const path = require("path");
const fs = require("fs");
// const { nanoid } = require("nanoid");
const response = require("../response/response");
const Busboy = require("busboy");
const moment = require("moment");
// remove serve

// Upload Image
module.exports.uploadImage = (req, res, next) => {
    try {
        const busboy = new Busboy({headers: req.headers});
        let randomFileName = "";
            
        let val = req.params.building_id
        console.log(val);
        try {
            if (! fs.existsSync(`images/building_${val}`)) {
                fs.mkdirSync(`images/building_${val}`)
            }

            busboy.on("file", (fieldname, file, filename, encoding, mimetype) => {

                const extension = filename.split(".")[filename.split(".").length - 1];
                const fileName = moment(Date.now()).format("DD-MM-YYYY HH-mm") + filename
                console.log(fileName);
                const saveTo = path.join(path.join(__dirname, "../../", "preliminary_energy_assessment_survey_backend", `images/building_${val}`, fileName));
                console.log("saveTo: ", saveTo)
                file.pipe(fs.createWriteStream(saveTo));
            });
        } catch (err) {
            console.error(err)
        }
        // })

        busboy.on("finish", () => {
            res.json(response({success: true, message: "Success!"}));
        });
        req.pipe(busboy);
    } catch (error) {
        return next(error);
    }
};

// console.log("req is", req)
// req.apiRes({
// fileName: randomFileName,
// link: "/img/" + randomFileName,
// });

module.exports.deleteImage = async (req, res, next) => {
    try {
        const fileName = req.params.fileName;
        const filePath = path.join(path.join(__dirname, "../../", "preliminary_energy_assessment_survey_backend", "images", fileName));
        fs.unlink(filePath, (error) => {
            if (error) 
                return next(Error("File not found!"));
            


            return res.json(response({success: true, message: "Success!"}));
        });
    } catch (error) {
        return next(error);
    }
};

// Download image
module.exports.getImage = (req, res, next) => {
    try {
        const fileName = req.params.fileName;
        const filePath = path.join(path.join(__dirname, "../../", "preliminary_energy_assessment_survey_backend", "images", fileName));
        const readStream = fs.createReadStream(filePath);
        readStream.on("open", () => {
            readStream.pipe(res);
        });
        readStream.on("end", () => {
            readStream.unpipe();
        });
        readStream.on("error", (error) => {
            res.end(error);
        });
    } catch (error) {
        return next(error);
    }
};

module.exports.removeImg = (req, res) => {
    try {
        let fileName = req.body.fileName
        let val = req.params.building_id

        console.log("file name is =====>", fileName)
        fileName.map(file => fs.unlink(`images/building_${val}/${file}`, (error) => {
            if (error) 
                // return next(Error("File not found!"));
                return res.status(400).json({status: 'error', error: 'File not found!'});
        }))
        return res.json(response({success: true, message: "Success!"}));
    } catch (error) {
        return next(error);
    }
}
