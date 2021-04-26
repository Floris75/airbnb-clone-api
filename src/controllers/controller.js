const Flats = require("../models/citySearch")

exports.home = (request, response) => {   
    response.send ("hello world");
}

exports.searchByCity = (request, response) => {
    const {cityName} = request.params;

    Flats.getByCity(cityName, (error, result) => {
        if (error) {
            response.send("Il n'y a pas d'appartements disponibles dans cette ville.")
        }
        response.send(result);
    })
}