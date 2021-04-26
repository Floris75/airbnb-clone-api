const places = require("../models/places") 

exports.createOne = (request, response) => {
    // let {city_id, name_place, description, rooms}
    places.test ((error, result) => {
        if (error) {
            response.send (error.message);
        }
        else {
            response.send("connection OK")
        }
    })
}