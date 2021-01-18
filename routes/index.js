const express = require("express");
const router = express.Router();
const userRoute = require('./routes.user')
const loginRoute = require('./routes.login')

const { routeMiddleware } = require('../middleware/middleware.authorization')


router.use("/login", loginRoute)

router.use(routeMiddleware)
router.use("/user",userRoute)

module.exports = router;
