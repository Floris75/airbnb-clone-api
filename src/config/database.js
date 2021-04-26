const mysql = require("mysql2");

const database = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.MYSQL_DB
});

database.connect((error) => {
    if (error) throw error;
    console.log("Connection to database works");
});

module.exports = database;