const { response } = require("express");
const express = require("express");
const router = express.Router();
const controller = require("../controllers/controller");
const placesController = require("../controllers/placesController");

const bookingsController = require("../controllers/bookingsController")


router.post("/signup", controller.signup);
router.get("/", controller.home);
router.get("/places/:place_id", placesController.placeDetails);

router.post("/signin", controller.connexion);



router.post("/places", placesController.createOne);
router.get("/places", placesController.searchByCity);
router.get("/host", placesController.searchHostPlaces)


router.post("/bookings", bookingsController.bookFlat);

router.use("*", (request, response) => {
    response.status(404).json({message: "La ressource demandée est introuvable"});
  });

module.exports = router;