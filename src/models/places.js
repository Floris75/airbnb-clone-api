const database = require("../config/database");

exports.test = (callback) => {
    database.query(`SELECT * FROM cities ;`, (error, result) => {
        if (error) {
            console.log("error :", error);
            callback(error, null);
            return;
        }
        callback(null, result);
    })
}