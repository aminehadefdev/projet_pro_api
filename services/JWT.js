const jwt = require('jsonwebtoken')
const env = require("dotenv").config().parsed;

const JWT_SIGN_SECRET = env.JWT_SIGN_SECRET
class serviceJWT {
    static generateTokenForUser(user) {
        return jwt.sign({
            email: user.email,
            role: user.role,
            id: user.id
        }, JWT_SIGN_SECRET, {
            expiresIn: "24h"
        })
    }

    static UserIsAutorised(req, res, next) {
        var token = req.body.token
        if (token.startsWith('Bearer ')) {
            token = token.slice(7, token.length);
        }

        if (token) {
            jwt.verify(token, JWT_SIGN_SECRET, (err, decoded) => {
              if (err) {
                  console.log('nooooooooooooooooooop')
                return res.json({
                  success: false,
                  message: 'Token is not valid'
                });
              } else {
                req.decoded = decoded;
                next();
              }
            });
          } else {
            return res.json({
              success: false,
              message: 'Auth token is not supplied'
            });
          }
    }
}

module.exports = serviceJWT;