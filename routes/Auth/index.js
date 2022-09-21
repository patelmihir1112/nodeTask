const express = require("express");
const router = express.Router();
const isAuth = require('../../middlewares/isAuth');

const authController = require("../../contollers/auth");

router.post("/login", authController.login);
router.post("/logout", authController.logout);



// router.post("/", authController.getDataById);



module.exports = router;