const { surveydb } = require("../database");
const { produceToken } = require("../security/token");
const bcrypt = require("bcrypt");
const response = require("../response/response");

const login = (email, password, callbackWhenDone) => {
  console.log("HHHHHH")
  return surveydb.login(email)
    .then((res) => {
      const result = res[0][0]
      console.log("-------->", result);
      if (res.length) {
        const hash = result.password.toString();
        return bcrypt.compare(password, hash, function (err, response) {
          if (response === true) {
            const payload = {
              email: result.email,
              password: result.password,
            };
            const token = produceToken(payload);
            const data = {
              token: token,
              login_user_id: result.login_user_id,
              email: result.email,
              user_level_id: result.user_level_id,
            };
            return callbackWhenDone(null, data);
          } else {
            return callbackWhenDone(null, false);
          }
        });
      } else {
        return callbackWhenDone(null, false);
      }
    })
    .catch((err) => {
      callbackWhenDone(err, null)
    });
};

module.exports = { login };
