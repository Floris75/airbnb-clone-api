const express = require("express");
const router = express.Router();
const places = require("../controllers/placesController");

router.post("/", places.createOne)

module.exports = router;