const { response } = require("express");
const express = require("express");
const router = express.Router();
const controller = require("../controllers/controller");
const placesController = require("../controllers/placesController");




router.get("/", controller.home);
router.get("/places/:place_id", placesController.placeDetails);

router.post('/signin', function(req, res){
    controller.connexion;
    response.send("Connexion");
  });





module.exports = router;