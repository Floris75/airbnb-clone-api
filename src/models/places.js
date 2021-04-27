const db = require("../config/database");

exports.getByCity = (city, callback) => {
    db.query(`SELECT * FROM cities INNER JOIN places ON cities.id_city = places.city_id WHERE name_city="${city}";`, (error, result) => {
        if (error) {
            console.log("error: ", error);
            callback(error, null);
            return;
          }
          callback(null, result);
    })
}