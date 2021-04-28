
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const secret = "719a7fa2bb664547aa56cfd7cc30a3f3c890df7214774b929420dd3c68dbca7332a7df8c89a844b1b865621012dcdbed";
const maxage = Math.floor(Date.now() / 1000) + (60*60);



const user = require("../models/model");


exports.home = (request, response) => {   
    response.send ("hello world");
}


exports.connexion = async (request, response) => {
    
    const email = request.body.email;
    const password = request.body.password;

    if (!email || !password ){
        await response.send ("Veuillez rentrer tous les champs")
    }
    
    else {
    user.getByUserEmail(request.body, async (error, result) => {
        if (error) {
            response.send(error.message);
        }
        else if (result.length === 0) {
            await response.status(401).json({ error: 'Utilisateur non trouvé !' });
        }
        else {
            const hash = result[0].password;
            bcrypt.compare(password, hash, async (error, correct) => {
                if (error) {
                    response.send(error.message);
                }
                else if (!correct) {
                    await response.status(401).json({ error: 'Mot de passe incorrect !' });
                }
                else {
                    const user = {
                        first_name: result[0].first_name,
                        last_name: result[0].last_name,
                        userId: result[0].id_user,
                        role : result[0].role,
                        email : result[0].email,
                        exp : maxage
                        
                       
                    }

                    jwt.sign(user, secret, (error, token) => {
                        if (error) {
                            response.send(error.message);
                        }
                        else {
                            request.user = {
                                first_name: result[0].first_name,
                                last_name: result[0].last_name,
                                userId: result[0].id_user,
                                role : result[0].role
                                
                            };
                            response.status(200).json(
                                { token: token, 
                                    user: {
                                        first_name : user.first_name,
                                        last_name : user.last_name,
                                        role: user.role,
                                        email: user.email
                                    } });
                            
                        }
                    });
                }
            });
        }
    });
}
}

    

exports.signup = (request, response) => {

    user.getByUserEmail(request.body, (error, result) => {
        if (error) {
            response.send(error.message);
        } else if (result.length > 0) {
            response.status(409).json({message: "Un utilisateur avec le même email existe déjà" })
                        
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
    })

}


