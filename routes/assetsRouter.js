const express = require("express");
const router = express.Router();
const assetsController=require('../controller/assetsController')

router.route("/addAsset")
.post(
    assetsController.createAsset
)
.get(
    assetsController.getAll
)
//rating..
router.route("/rating")
.post(
    assetsController.createrating
)
.get(
    assetsController.getrating
)
// request for assests
router.route("/reqassest")
.post(
    assetsController.request_device
)
// assign device
router.route("/assign_device")
.post(
    assetsController.updateAsset
)
// find employee attendance based on employee checkin
router.route("/attandance")
.post(assetsController.attandance)
// find employee salary
router.route("/salary")
.post(assetsController.salary)

module.exports=router;