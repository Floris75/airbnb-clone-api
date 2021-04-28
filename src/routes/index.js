const express = require("express");
const router = express.Router();
const controller = require("../controllers/controller");
const placesController = require("../controllers/placesController");

router.get("/", controller.home);
router.get("/places/:place_id", placesController.placeDetails);
router.post("/places", placesController.createOne);
router.get("/places", placesController.searchByCity);

router.use("*", (request, response) => {
    response.status(404).json({message: "La ressource demandée est introuvable"});
  });

module.exports = router;