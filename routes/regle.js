const regleController = require('../controllers/regleController')

module.exports = (app)=>{
    app.get("/regles", async (req, res)=>{
        var response = await regleController.getRegles()
        res.status(response.status).json(response)
    })
    app.get("/regle", async (req, res)=>{
        var response = await regleController.getRegle(req)
        res.status(response.status).json(response)
    })
}