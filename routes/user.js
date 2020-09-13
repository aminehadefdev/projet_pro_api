const userController = require('../controllers/userController')
module.exports = (app)=>{
    app.post("/user/register", async (req, res)=>{
        var response = await userController.register(req.body)
        res.json(response)
    })
    app.post('/user/login', async (req, res)=>{
        var response = await userController.login(req.body)
        res.json(response)
    })
}