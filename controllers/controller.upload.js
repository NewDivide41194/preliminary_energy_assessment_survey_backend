const path = require("path");
const fs = require("fs");
const { nanoid } = require("nanoid");

const Busboy = require("busboy");
//remove serve

// Upload Image
module.exports.uploadImage = (req, res, next) => {
  try {
    const busboy = new Busboy({ headers: req.headers });
    const randomString = nanoid();
    let randomFileName = "";
    busboy.on("file", (fieldname, file, filename, encoding, mimetype) => {
      const extension = filename.split(".")[filename.split(".").length - 1];
      randomFileName = randomString + "." + extension;
      const saveTo = path.join(
        path.join(__dirname, "../../", "assets", "images", randomFileName)
      );
      // console.log("saveTo: ", saveTo, fieldname, filename)
      file.pipe(fs.createWriteStream(saveTo));
    });
    busboy.on("finish", () => {
      req.apiRes({
        fileName: randomFileName,
        link: "/img/" + randomFileName,
      });
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
      path.join(__dirname, "../../", "assets", "images", fileName)
    );
    fs.unlink(filePath, (error) => {
      if (error) return next(Error("File not found!"));
      return req.apiRes(null);
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
      path.join(__dirname, "../../", "assets", "images", fileName)
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
