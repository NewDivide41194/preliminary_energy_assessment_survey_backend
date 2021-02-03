const path = require("path");
const fs = require("fs");
// const { nanoid } = require("nanoid");
const response = require("../response/response");
const Busboy = require("busboy");
const moment = require("moment");
//remove serve

// Upload Image
module.exports.uploadImage = (req, res, next) => {
  console.log(req.body);
  try {
    const busboy = new Busboy({ headers: req.headers });
    // const randomString = nanoid();
    let randomFileName = "";
    busboy.on("file", (fieldname, file, filename, encoding, mimetype) => {
      const extension = filename.split(".")[filename.split(".").length - 1];
      console.log("file name is", filename)
      const fileName=moment(Date.now()).format("DD-MM-YYYY HH-mm")+filename
      const saveTo = path.join(
        path.join(__dirname, "../../", "preliminary_energy_assessment_survey_backend", "images", fileName)
      );
      // console.log("saveTo: ", saveTo, " fieldname ", fieldname, " file name", filename ,"randomString", randomString)
      file.pipe(fs.createWriteStream(saveTo));
    });
    busboy.on("finish", () => {
      // console.log("req is", req)
      // req.apiRes({
      //   fileName: randomFileName,
      //   link: "/img/" + randomFileName,
      // });
      res.json(response({success: true, message: "Success!"}));
    });
    req.pipe(busboy);
  } catch (error) {
    return next(error);
  }
};

module.exports.deleteImage = async (req, res, next) => {
  try {
    const fileName = req.params.fileName;
    const filePath = path.join(
      path.join(__dirname, "../../", "preliminary_energy_assessment_survey_backend", "images", fileName)
    );
    fs.unlink(filePath, (error) => {
      if (error) return next(Error("File not found!"));
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
    const filePath = path.join(
      path.join(__dirname, "../../", "preliminary_energy_assessment_survey_backend", "images", fileName)
    );
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
