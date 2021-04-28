
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

//rechercher en fonction de dates specifiques
exports.findRangeDates = (request, response) => {
    const check_in  = request.query.check_in
    const check_out = request.query.check_out
    places.getRangeDates (check_in, check_out, (error, date_range) => {
        if (error) {
            response.send (error.message);
        }
        else {
            response.status(200).json({"place": date_range});
        }
    })
}

exports.searchByCity = (request, response) => {
    const cityName = request.query.city;
    console.log(cityName);

    places.getByCity(cityName, (error, result) => {
        if (error) {
            response.send("Il n'y a pas d'appartements disponibles dans cette ville.")
        }
        response.send(result);

    })
}


exports.updatePlace = (request, response) => {
    const {place_id} = request.params;
    const {name_place, description, rooms, bathrooms, max_guests, price_by_night} = request.body;
    const role = "host";
    if (!role) {
        response.status(401).json({message: "User not connected"})
    }
    else if (role === "guest") {
        response.status(403).json({message: "Vous n'êtes pas autorisé à accéder à cette ressource"})
    }
    else {
    places.modifyPlaceInfos(place_id, request.body, (error, result) => {
        if (error) {
            response.send (error.message);
        }
        else {
            response.status(200).json({message: "modification ok", result});
        }
    })
 }
}

exports.searchHostPlaces = (request, response) => {
    const user_id = 1;

    places.getHostPlaces(user_id, (error, host_infos) => {
        if (error) {
        response.send(error.message);
        } else {
        response.status(200).json({place: host_infos});
        }
    })
}




