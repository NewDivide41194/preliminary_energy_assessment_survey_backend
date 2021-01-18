const { userService } = require("../services");
const response = require("../response/response");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const addUser = (req, res) => {
  const userName = req.body.userName;
  const password = req.body.password;
  const email = req.body.email;
  const companyName = req.body.companyName;
  const phoneNo = req.body.phoneNo;

  bcrypt.hash(password, saltRounds, function (err, hash) {
    userService
      .addUser(userName, hash, email, companyName, phoneNo)
      .then((data) => {
        res.json(
          response({
            success: true,
            message: "Inserted!",
            payload: data,
          })
        );
      })
      .catch((err) => {
        if (err.errno == 1062) {
          res.json(
            response({ success: false, message: "Email Already Exist! " })
          );
        }
        res.json(response({ success: false, message: err }));
      });
  });
};

module.exports = { addUser };
