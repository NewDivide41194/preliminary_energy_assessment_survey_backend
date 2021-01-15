const express = require("express");
const router = express.Router();

const productRoute = require("./routes.products");
router.use("/product",productRoute);
// router.use("/product",(req,res)=>res.send("Product"));
module.exports = router;
