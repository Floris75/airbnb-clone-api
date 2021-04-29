const { response } = require('express');
const bookings = require("../models/bookings") ;


exports.filterBooking = (request, response) => {
    const { role } = request.body;
    if (!role) {
        response.status(401).json({message: "User not connected"})
    } else if (role === "guest") {
        const user_id = 2;
        bookings.getBookings(user_id, (error, booking_infos) => {
            response.status(200).json({booking: booking_infos});
        })

    } else {
        const user_id = 1;
        bookings.getAvailablePlaces(user_id, (error, places_infos) => {
            response.status(200).json({booking: places_infos});
       
        })
    }
}

