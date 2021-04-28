const database = require('../config/database');

exports.getByMail = (requestBody, callback) => {
    database.query(`select * from users where email="${requestBody.email}"`, (error, result) => {
        if (error) {
            callback(error, null);
            return;
        }

        callback(null, result);
    });
}