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

    static generateTokenForAdmin(admin) {
      return jwt.sign({
          email: admin.email,
          niveau: admin.niveau,
          id: admin.id
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
    static AdminIsAutorisedLevelOne(req, res, next) {
      var token = req.body.token
      if (token.startsWith('Bearer ')) {
          token = token.slice(7, token.length);
      }

      if (token) {
          jwt.verify(token, JWT_SIGN_SECRET, (err, decoded) => {
            if (err) {
                console.log(err)
              return res.json({
                success: false,
                message: 'Token is not valid'
              });
            } else {
              req.decoded = decoded;
              if(decoded.niveau >= 1){
                next();
              }else{
                return res.json({
                  success: false,
                  message: "votre niveau d'administration n'ai pas sufisant!"
                })
              }
            }
          });
        } else {
          return res.json({
            success: false,
            message: 'Auth token is not supplied'
          });
        }
  }
  static AdminIsAutorisedLevelTwo(req, res, next) {
    var token = req.body.token
    if (token.startsWith('Bearer ')) {
        token = token.slice(7, token.length);
    }

    if (token) {
        jwt.verify(token, JWT_SIGN_SECRET, (err, decoded) => {
          if (err) {
              console.log(err)
            return res.json({
              success: false,
              message: 'Token is not valid'
            });
          } else {
            req.decoded = decoded;
            if(decoded.niveau >= 2){
              next();
            }else{
              return res.json({
                success: false,
                message: "votre niveau d'administration n'ai pas sufisant!"
              })
            }
          }
        });
      } else {
        return res.json({
          success: false,
          message: 'Auth token is not supplied'
        });
      }
  }
  static AdminIsAutorisedLevelTwo(req, res, next) {
    var token = req.body.token
    if (token.startsWith('Bearer ')) {
        token = token.slice(7, token.length);
    }

    if (token) {
        jwt.verify(token, JWT_SIGN_SECRET, (err, decoded) => {
          if (err) {
              console.log(err)
            return res.json({
              success: false,
              message: 'Token is not valid'
            });
          } else {
            req.decoded = decoded;
            if(decoded.niveau >= 3){
              next();
            }else{
              return res.json({
                success: false,
                message: "votre niveau d'administration n'ai pas sufisant!"
              })
            }
          }
        });
      } else {
        return res.json({
          success: false,
          message: 'Auth token is not supplied'
        });
      }
  }
  static AdminIsAutorisedLevelThree(req, res, next) {
    if(req.body.token === null || req.body.token == undefined){
      return res.json({
        success: false,
        message: "aucun token"
      })
    }
    var token = req.body.token
    if (token.startsWith('Bearer ')) {
        token = token.slice(7, token.length);
    }

    if (token) {
        jwt.verify(token, JWT_SIGN_SECRET, (err, decoded) => {
          if (err) {
              console.log(err)
            return res.json({
              success: false,
              message: 'Token is not valid'
            });
          } else {
            req.decoded = decoded;
            if(decoded.niveau >= 3){
              next();
            }else{
              return res.json({
                success: false,
                message: "votre niveau d'administration n'ai pas sufisant!"
              })
            }
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