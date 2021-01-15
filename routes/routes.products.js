const express = require("express");
const router = express.Router();
const productController=require("../controllers")

router.get("/productsList", productController.getProductsList);

module.exports=router