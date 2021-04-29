const { response } = require("express");
const express = require("express");
const router = express.Router();
const controller = require("../controllers/controller");
const placesController = require("../controllers/placesController");
const bookingsController = require("../controllers/bookingsController");

const bookingsController = require("../controllers/bookingsController")




router.get("/", controller.home);
router.post("/signup", controller.signup);
router.post("/signin", controller.connexion);

router.get("/places/:place_id", placesController.placeDetails);
router.post("/places", placesController.createOne);
 
router.get("/places", placesController.searchByCity);
router.get("/host", placesController.searchHostPlaces)
router.get("/bookings", bookingsController.filterBooking)

router.get("/places", placesController.filterPlace);

router.post("/bookings", bookingsController.bookFlat);
router.patch("/places/:place_id", placesController.updatePlace);
router.get("/cities", controller.getCities)

router.get("/bookings", bookingsController.searchResasByFlat);
router.delete("/bookings/:id_booking", bookingsController.deleteResa);
 

router.use("*", (request, response) => {
    response.status(404).json({message: "La ressource demandée est introuvable"});
  });

module.exports = router;