const express = require("express");
const router = express.Router();
const placesController = require("../controllers/placesController");
const bookingsController = require("../controllers/bookingsController")

router.get("/places", placesController.searchByCity);
router.post("/bookings", bookingsController.bookFlat);

module.exports = router;