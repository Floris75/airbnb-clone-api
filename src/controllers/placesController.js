
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

exports.filterPlace = (request, response) => {
    const filters = request.query;
    if (!filters) {
        const user_id = 1;
        places.getHostPlaces(user_id, (error, host_infos) => {
            if (error) {
            response.send(error.message);
            } else {
            response.status(200).json({place: host_infos});
            }
        })
    }
    else {
        if (filters.length === 1) {
            const cityName = request.query.city;
            places.getByCity(cityName, (error, result) => {
                if (error) {
                    response.send(error.message)
                }
                else {
                    if (result.length === 0) {
                        response.status(200).json({message: "Aucun n'appartement n'est disponible dans cette ville"});
                    }
                    else {
                        response.status(200).json({result: result})
                    }
                }
            })
        }
        else {
            const check_in  = request.query.check_in
            const check_out = request.query.check_out
            places.getRangeDates (check_in, check_out, (error, places) => {
                if (error) {
                    response.send (error.message);
                }
                else {
                    response.status(200).json({places: places})
                }
            })
        }
    }
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

exports.placeDelete = (request, response) => {
    const {place_id} = request.params;
    const role = "host";
    
    if (!role) {
        response.status(401).json({message: "User not connected"})
    }
    else if (role === "guest") {
        response.status(403).json({message: "Vous n'êtes pas autorisé à accéder à cette ressource"})
    }
    else {

        places.deleteBooking (place_id,  (error, result)=>{
            if (error) {
                response.send (error.message);
            }
            else {
                places.delete(place_id,  (error, result) => {
                    if (error) {
                    response.send (error.message);
                    }
                    else {
                    response.status(200).json({message: "suppression ", result});
                    }
                })
            }
        })       
    }
}


 }
}

