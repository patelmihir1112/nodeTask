const express = require("express");
const router = express.Router();
const isAuth = require('../../middlewares/jwt_Auth');

const roleController = require("../../contollers/role");

router.get("/",isAuth, roleController.index);
router.get("/:id", roleController.getDataById);
router.post("/", roleController.create);
router.put("/:id", roleController.update);
router.delete("/:id", roleController.delete);
router.patch("/updatemodule/:id", roleController.upademodule);
router.post("/deleteModule", roleController.deleteModule);
router.post("/insertOnerole", roleController.insertOnerole);
router.post("/checkForAcces", roleController.checkForAcces);





module.exports = router;