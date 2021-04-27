const places = require("../models/places");

exports.searchByCity = (request, response) => {
    const cityName = request.query.city;
    console.log(cityName);

    places.getByCity(cityName, (error, result) => {
        if (error) {
            response.send("Il n'y a pas d'appartements disponibles dans cette ville.")
        }
        response.send(result);
    })
}