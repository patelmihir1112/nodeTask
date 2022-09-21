const express = require("express");
const router = express.Router();
const isAuth = require('../../middlewares/jwt_Auth');

const userController = require("../../contollers/user");

router.get("/", userController.index);
router.get("/:id", userController.getDataById);
router.post("/", userController.create);
router.put("/:id", isAuth ,userController.update);
router.delete("/:id", userController.delete);
router.post("/updateManyUser", userController.updateManyUser);
router.post("/updateMultipleUser", userController.updateMultipleUser);


module.exports = router;