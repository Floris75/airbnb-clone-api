// OUTILS
const { response } = require("express");
const express = require("express");
const router = express.Router();
const controller = require("../controllers/controller");
const placesController = require("../controllers/placesController");
const bookingsController = require("../controllers/bookingsController")


//GET
router.get("/", controller.home);
router.get("/places/:place_id", placesController.placeDetails);
router.get("/places", placesController.searchByCity);


//POST
router.post("/signin", controller.connexion);
router.post("/signup", controller.signup);
router.post("/places", placesController.createOne);
router.post("/bookings", bookingsController.bookFlat);

// DELETE
router.delete('/places/:place_id', placesController.placeDelete);



// Erreur 404
router.use("*", (request, response) => {
    response.status(404).json({message: "La ressource demandée est introuvable"});
  });

  // Exportation router
module.exports = router;