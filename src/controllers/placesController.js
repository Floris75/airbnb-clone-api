const places = require("../models/places") 

exports.createOne = (request, response) => {
    let {city_name, name_place, description, rooms, bathrooms, max_guests, price_by_night, user_id} = request.body;
    const role = "host";
    if (!role) {
        response.status(401).json({message: "User not connected"})
    }
    else if (role === "guest") {
        response.status(403).json({message: "Access denied"})
    }
    else {
        if (!city_name || !name_place || !description || !rooms || !bathrooms || !max_guests || !price_by_night || !user_id ) {
            response.status(400).json({message: "Missing input"})
        }
        else {
            places.getCityId (city_name, (error, id_city) => {
                if (error) {
                    response.send (error.message);
                }
                const city_id = id_city[0].id_city;
                const info_place = {
                    user_id,
                    city_id, 
                    name_place,
                    description, 
                    rooms, 
                    bathrooms, 
                    max_guests, 
                    price_by_night
                }
                console.log(info_place)
                places.addOne (info_place, (error, result) => {
                    if (error) {
                        response.send (error.message);
                    }
                    else {
                        response.status(201).json({message: "Creation success" })
                    }
                })
            })
        }
    }
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