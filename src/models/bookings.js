const database = require("../config/database");

exports.bookPlace = (booking, callback) => {
    database.query(`INSERT INTO bookings(place_id, user_id, check_in, check_out) VALUES(${booking.place_id}, ${booking.user_id}, "${booking.check_in}", "${booking.check_out}");`, (error, result) => {
        if (error) {
            console.log("error: ", error);
            callback(error, null);
            return;
          }
          callback(null, result);
    })
}

exports.getResasByFlat = (id, callback) => {
    database.query(`SELECT * FROM bookings WHERE place_id=${id};`, (error, result) => {
        if (error) {
            console.log("error: ", error);
            callback(error, null);
            return;
          }
          callback(null, result);
    })
}
