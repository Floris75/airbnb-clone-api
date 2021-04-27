const express = require("express");
const router = express.Router();
const controller = require("../controllers/controller");
const placesController = require("../controllers/placesController");


router.get("/", controller.home);
router.get("/places/:place_id", placesController.placeDetails);
router.get("/places", placesController.findRangeDates);

router.post("/signup", controller.signup);



module.exports = router;