const database = require('../config/database');

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



