
const places = require("../models/places");

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