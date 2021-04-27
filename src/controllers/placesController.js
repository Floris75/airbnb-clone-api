const places = require("../models/places") 

exports.createOne = (request, response) => {
    let {city_id, name_place, description, rooms, bathrooms, max_guests, price_by_night} = request.body;
    places.test (request.body, (error, result) => {
        if (error) {
            response.send (error.message);
        }
        else {
            response.status(200).json({"body": {...request.body}})
            response.send("connection OK")
        }
    })
}

exports.placeDetails = (request, response) => {
    const {place_id} = request.params
    places.getDetails (place_id, (error, place_info) => {
        if (error) {
            response.send (error.message);
        }
        else {
            response.status(200).json({"place": place_info});
        }
    })
}