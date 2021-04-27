const express = require("express");
const router = express.Router();
const controller = require("../controllers/controller");
const placesController = require("../controllers/placesController");
const placesRouters = require("./places");
const bookingsRouters = require("./bookings");

router.get("/", controller.home);
router.get("/places/:place_id", placesController.placeDetails);
router.use("/places", placesRouters);
router.use("/bookings", bookingsRouters)

module.exports = router;