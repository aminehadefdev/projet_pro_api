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

    app.get("/user/search", JWT.UserIsAutorised, async (req, res)=>{
        var response = await userController.search(req)
        res.status(response.status).json(response)
    })
    app.get("/user/get/mentor", JWT.UserIsAutorised, async (req, res)=>{
        var response = await userController.getMentor(req)
        res.status(response.status).json(response)
    })

    app.get("/user/get/mentors", JWT.UserIsAutorised, async (req, res)=>{
        var response = await userController.getMentors(req)
        res.status(response.status).json(response)
    })

    app.post("/user/request/mentoring", JWT.UserIsAutorised, async (req, res)=>{
        var response = await userController.requisteMentoring(req)
        res.status(response.status).json(response)
    })
}