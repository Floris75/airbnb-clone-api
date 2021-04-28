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

