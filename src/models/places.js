
const database = require('../config/database');



exports.addOne = (place, callback) => {
    database.query(`INSERT INTO places (user_id, city_id, name_place, description, rooms, bathrooms, max_guests, price_by_night) VALUES (${place.user_id}, ${place.city_id}, "${place.name_place}", "${place.description}", "${place.rooms}", ${place.bathrooms}, ${place.max_guests}, ${place.price_by_night});`, (error, result) => {

        if (error) {
            console.log("error :", error);
            callback(error, null);
            return;
        } 
        callback(null, result);
    })
}


exports.getRangeDates = (dateArrivee, dateDepart, callback) => { 
    console.log(dateDepart, dateArrivee)
    database.query(`SELECT distinct * FROM places WHERE id_place NOT IN(SELECT place_id as id_place FROM bookings WHERE not DATEDIFF(bookings.check_in, "${dateDepart}") > 0 and not DATEDIFF(bookings.check_out, "${dateArrivee}") < 0);`, (error, result) => {
        if (error) {
            callback (error, null);
            return;    
        }
            callback(null, result);
        })
    }

exports.getCityId = (city_name, callback) => {
    database.query(`SELECT id_city FROM cities WHERE name_city = "${city_name}";`, (error, result) => {
        if (error) {
            console.log("error :", error);
            callback(error, null);
            return;
        } 
        callback(null, result);
    })
}

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

exports.getByCity = (city, callback) => {
    database.query(`SELECT * FROM cities INNER JOIN places ON cities.id_city = places.city_id WHERE name_city="${city}";`, (error, result) => {
        if (error) {
            console.log("error: ", error);
            callback(error, null);
            return;
          }
          callback(null, result);
    })
}


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

exports.delete = (id,  callback) => {
    database.query(`DELETE  FROM places WHERE id_place = ${id};`, (error, result) => {
        if (error) {
            console.log("error: ", error);
            callback(error, null);
            return;
          }
          callback(null, result); 
    })
}

exports.modifyPlaceInfos = (id, infos, callback) => {
    database.query(`UPDATE places SET name_place="${infos.name_place}", description="${infos.description}", rooms=${infos.rooms}, bathrooms=${infos.bathrooms}, max_guests=${infos.max_guests}, price_by_night=${infos.price_by_night} WHERE id_place=${id};`, (error, result) => {
        if (error) {
            console.log("error: ", error);
            callback(error, null);
            return;
          }
          callback(null, result); 
    })
}


exports.deleteBooking = (id,  callback) => {
    console.log(callback);
    database.query(`DELETE  FROM bookings WHERE place_id = ${id};`, (error, result) => {
        if (error) {
            console.log("error: ", error);
            callback(error, null);
            return;
          }
          callback(null, result); 
    })
}






exports.getHostPlaces = (id, callback) => {
    database.query(`SELECT * FROM places WHERE user_id=${id};`, (error, result) => {
        if (error) {
            console.log("error :", error);
            callback(error, null);
            return;
        } 
        callback(null, result);

    })
}

exports.createCity = (name, callback) => {
    database.query(`INSERT INTO cities(name_city) VALUES ("${name}")`, (error, result) => {
        if (error) {
            console.log("error :", error);
            callback(error, null);
            return;
        } 
        callback(null, result);

    })
}

