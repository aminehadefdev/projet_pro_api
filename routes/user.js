const userController = require('../controllers/userController')
const JWT = require('../services/JWT')
module.exports = (app)=>{
    app.post("/user/register", async (req, res)=>{
        var response = await userController.register(req.body)
        res.status(response.status).json(response)
    })
    app.post('/user/login',async (req, res)=>{
        var response = await userController.login(req.body)
        res.status(response.status).json(response)
    })
}