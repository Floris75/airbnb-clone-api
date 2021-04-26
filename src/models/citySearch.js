const db = require("../config/database");

exports.getByCity = (cityName, callback) => {
    db.query(`SELECT * FROM places INNER JOIN cities ON places.city_id = cities.id_city WHERE cities.name_city = ${cityName};`, (error, result) => {
        if (error) {
            console.log("error: ", error);
            callback(error, null);
            return;
          }
      
          callback(null, result);
    })
}