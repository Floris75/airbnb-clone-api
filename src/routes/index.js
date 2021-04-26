const express = require("express");
const router = express.Router();
const controller = require("../controllers/controller");
const placesRouters = require("./places")
const bookingsRouters = require("./bookings")

router.get("/", controller.home);
router.use("/places", placesRouters);
router.use("/bookings", bookingsRouters)

module.exports = router;