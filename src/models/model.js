const database = require("../config/database");

exports.getByUserEmail = (requestBody, callback) => {
    database.query(`SELECT * FROM users WHERE email="${requestBody.email}"`, (error, result) => {

        if (error) {
            callback(error, null);
            return;
        }
        callback(null, result);
    });
}

exports.userRegister = (requestBody, encryptedPassword, callback) => {
    let query = `INSERT INTO users(email, password, first_name, last_name, role)
    values("${requestBody.email}", "${encryptedPassword}", "${requestBody.first_name}", "${requestBody.last_name}", "${requestBody.role}");`        
    database.query(query, (error, result) => {
        if (error){
            callback(error, null);
            return;
        }

        callback(null, result);
    });
}

exports.getAllCities = (callback) =>{
    database.query("SELECT * FROM cities;", (error, result) => {
        if (error) {
            callback(error, null);
            return;
        }
        callback(null, result);
    });
}
