const express = require("express");
const router = express.Router();
const {userController}=require("../controllers")

router.post("/addUser", userController.addUser);

module.exports=router