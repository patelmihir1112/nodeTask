const express = require("express");
const router = express.Router();

// const authRoutes = require("./Auth");
const roleRoutes = require("./Role");
const userRoutes = require("./User");
const authRoutes = require("./Auth");


// const accessModuleRoutes = require("./AccessModule");

// router.use("/", authRoutes);
router.use("/role", roleRoutes);
router.use("/user", userRoutes);
router.use("/", authRoutes);


// router.use("/accessModule", accessModuleRoutes);

module.exports = router;
