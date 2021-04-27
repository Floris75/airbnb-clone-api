const database = require("../config/database");

exports.getDetails = (id, callback) => {
    database.query(`SELECT * from places where id_place=${id};`, (error, result) => {
        if (error) {
            console.log("error :", error);
            callback(error, null);
            return;
        } 
        callback(null, result);
    })
}

exports.getRangeDates = (id, callback) => { 
    database.query(`SELECT * id_place FROM bookings WHERE check_in="${dateArrivee}" AND check_out="${dateDepart}" ;`, (error, result) => {
        if (error) {
            callback (error, null);
            return;    
        }
            callback(error, null);
    })
}