const express = require("express");
const router = express.Router();
const controller = require("../controllers/controller");

router.get("/", controller.home);

router.get("/places?city={cityName}", controller.searchByCity);


module.exports = router;