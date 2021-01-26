const express = require("express");
const router = express.Router();
const userRoute = require("./routes.user");
const loginRoute = require("./routes.login");
const buildingRoute = require("./routes.building");
const questionRoute = require("./routes.question");
const imageRoute = require("./routes.image");

const { routeMiddleware } = require("../middleware/middleware.authorization");

router.use("/login", loginRoute);

// router.use(routeMiddleware)
router.use("/user", userRoute);
router.use("/building", buildingRoute);
router.use("/question", questionRoute);
router.use("/image", imageRoute);


module.exports = router;
