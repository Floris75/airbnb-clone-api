// OUTILS
const express = require("express");
const router = express.Router();
const controller = require("../controllers/controller");
const placesController = require("../controllers/placesController");
const bookingsController = require("../controllers/bookingsController");
const isAuth = require("../middlewares/isAuth");

//GET
router.get("/", controller.home);
router.get("/places", isAuth, placesController.filterPlace);
router.get("/places/:place_id", placesController.placeDetails);
router.get("/bookings", isAuth, bookingsController.filterBooking);
router.get("/cities", controller.getCities);

//POST
router.post("/signin", controller.connexion);
router.post("/signup", controller.signup);
router.post("/places", isAuth, placesController.createOne);
router.post("/bookings", isAuth, bookingsController.bookFlat);

// PATCH
router.patch("/places/:place_id", isAuth, placesController.updatePlace);

// DELETE
router.delete('/places/:place_id', isAuth, placesController.placeDelete);
router.delete("/bookings/:id_booking", isAuth, bookingsController.deleteResa);

// Erreur 404
router.use("*", (request, response) => {
    response.status(404).json({message: "La ressource demandée est introuvable"});
  });

// Exportation router
module.exports = router;