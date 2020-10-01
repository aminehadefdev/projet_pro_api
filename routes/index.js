const { response } = require("express")

module.exports = (app)=>{
    require("./user")(app)
    require('./admin')(app)
    require('./video')(app)

    require('./404')(app)
}