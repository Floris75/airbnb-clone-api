// OUTILS
const express = require("express");
const router = express.Router();
const controller = require("../controllers/controller");
const placesController = require("../controllers/placesController");
const bookingsController = require("../controllers/bookingsController");

//GET
router.get("/", controller.home);
router.get("/places", placesController.filterPlace);
router.get("/places/:place_id", placesController.placeDetails);
router.get("/bookings", bookingsController.filterBooking);
router.get("/cities", controller.getCities);

//POST
router.post("/signin", controller.connexion);
router.post("/signup", controller.signup);
router.post("/places", placesController.createOne);
router.post("/bookings", bookingsController.bookFlat);

// PATCH
router.patch("/places/:place_id", placesController.updatePlace);

// DELETE
router.delete('/places/:place_id', placesController.placeDelete);
router.delete("/bookings/:id_booking", bookingsController.deleteResa);

// Erreur 404
router.use("*", (request, response) => {
    response.status(404).json({message: "La ressource demandée est introuvable"});
  });

// Exportation router
module.exports = router;