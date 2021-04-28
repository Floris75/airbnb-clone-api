const { response } = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const user = require("../models/model");

exports.home = (request, response) => {   
    response.send ("hello world");
}

exports.signup = (request, response) => {

    user.getByUserEmail(request.body, (error, result) => {
        if (error) {
        response.send(error.message);
        } else if (result.length > 0) {
            response.status(409).json({message: "Un utilisateur avec le même email existe déjà" })
                        
            } else {
                if (typeof first_name !== string) {
                response.status(400).json({message: "Le champ first_name doit être une chaîne de caractères"})
            
                } else if ( !first_name ) {
                    response.status(400).json({message: "Le champ first_name n'est pas n'est pas renseigné"})

                } else {
                const saltRounds = 10;
                bcrypt.hash(request.body.password, saltRounds, (error, encryptedPassword) => {

                    if (error) {
                    response.send(error.message);
                    } 
                    user.userRegister(request.body, encryptedPassword, (error, result) => {
                        if (error) {
                        response.send(error.message);
                        } else {
                        response.status(201).json({message: "Success"})
                        }
                    });
                });
            }
        }
    })
}
