const routeMiddleware = require("./middleware.authorization");
const upload = require("./middleware.upload");
const deleteFiles = require("./middleware.delete");

module.exports = { routeMiddleware, upload, deleteFiles };
