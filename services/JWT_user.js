const jwt = require('jsonwebtoken')
const env = require("dotenv").config().parsed;

const JWT_SIGN_SECRET = env.JWT_SIGN_SECRET
class serviceJWT_user {
  static generateTokenForUser(user) {
    if(user){
      return jwt.sign(
          {
            email: user.email,
            role: user.role,
            id: user.id
          },
          JWT_SIGN_SECRET,
          {
            expiresIn: "24h"
          }
        )
    }
    return {
      message: "not user!",
      success: false,
    }
  }
  static UserIsAutorised(req, res, next) {
    var token = ''
    if(req.body.token == null || req.body.token == undefined){
      if(req.query.token == null || req.query.token == undefined){
        return res.status(401).json({
          success: false,
          message: 'Token is not difined'
        });
      }
      token = req.query.token
    }else{
      token = req.body.token
    }
    if(token.startsWith('Bearer ')) {
        token = token.slice(7, token.length);
    }
    if(token){
      jwt.verify(token, JWT_SIGN_SECRET, (err, decoded) => {
        if(err){
          return res.status(401).json({
            success: false,
            message: 'Token is not valid'
          });
        }else {
          req.decoded = decoded;
          next();
        }
      });
    }else{
      return res.status(401).json({
        success: false,
        message: 'Auth token is not supplied'
      });
    }
  }
}

module.exports = serviceJWT_user;