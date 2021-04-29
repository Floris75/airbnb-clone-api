const database = require("../config/database");

exports.getBookings = (id, callback) => {
    database.query(`SELECT * FROM bookings WHERE user_id=${id};`, (error, result) => {
        if (error) {
            console.log("error :", error);
            callback(error, null);
            return;
        } 
        callback(null, result);
    })
}

exports.getAvailablePlaces = (id, callback) => {
    database.query(`SELECT * FROM places WHERE user_id=${id};`, (error, result) => {
        if (error) {
            console.log("error :", error);
            callback(error, null);
            return;
        } 
        callback(null, result);
    })
}
