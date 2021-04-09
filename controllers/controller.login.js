const { loginService } = require('../services')
const response = require('../response/response')
const { verifyToken } = require('../security/token')


const logIn = (req, res, next) => {
    const email = req.body.email
    const password = req.body.password

    loginService.login(email, password, (err, data) => {
        if (err) {
            next(err)
        } else {
            if (data === false) {
                next("Email or Password Incorrect!")
            } else {
                res.json(response({ success: true, message: "Login success", payload: [data] }))

            }
        }
    })
};

module.exports = { logIn }
