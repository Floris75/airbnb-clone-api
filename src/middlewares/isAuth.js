const jwt = require("jsonwebtoken");
const secret = process.env.SECRET;

const isAuth = (request, response, next) => {
    const token = request.headers.authorization.slice(7);
    if (!token) {
        next()
    }
    else {
        jwt.verify(token, secret, (error, user) => {
            if (error) {
                response.send(error.message);
            }
            else {
                const {first_name, last_name, role, email, userId, exp} = user;
                if (Date.now()/1000 >= exp) {
                    request.user= {role: ""};
                    next()
                }
                request.user = {first_name, last_name, role, email, userId};
                next();
            }
        })
    }
}

module.exports = isAuth;