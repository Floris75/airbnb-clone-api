const bookings = require("../models/bookings");

exports.bookFlat = (request, response) => {
    const {user_id, place_id, check_in, check_out} = request.body;
    const role = "guest";
    if (!role) {
        response.status(401).json({message: "User not connected"})
    }
    else if (role === "host") {
        response.status(403).json({message: "Vous n'êtes pas autorisé à accéder à cette ressource"})
    }
    else {
        if (!user_id || !place_id || !check_in || !check_out ) {
            response.status(400).json({message: "Missing input"})
        }
        else {
            bookings.bookPlace(request.body, (error, result) => {
                if(error) {
                    response.send("Cet appartement n'est pas disponible aux dates demandées")
                }
                response.status(201).json({message: "réservation ok"});
            })
        }
    }
}

exports.searchResasByFlat = (request, response) => {
    const place_id = request.query.place_id;
    const role = request.user;
    if (!role) {
        response.status(401).json({message: "User not connected"})
    } else {
        bookings.getResasByFlat(place_id, (error, result) => {
            if (error) {
                response.send (error.message);
            }
            else {
                response.status(200).json({message: "voici tous les bookings pour cet appartement", result});
            }
        })
    }   
}

