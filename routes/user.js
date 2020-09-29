const userController = require('../controllers/userController')
const serviceJWT_user = require('../services/JWT_user')


module.exports = (app)=>{
    app.post("/user/register", async (req, res)=>{
        var response = await userController.register(req.body)
        res.status(response.status).json(response)
    })
    app.post('/user/login', async (req, res)=>{
        var response = await userController.login(req.body)
        res.status(response.status).json(response)
    })

    app.get("/user/search", serviceJWT_user.UserIsAutorised, async (req, res)=>{
        var response = await userController.search(req)
        res.status(response.status).json(response)
    })
    app.get("/user/get/mentor", serviceJWT_user.UserIsAutorised, async (req, res)=>{
        var response = await userController.getMentor(req)
        res.status(response.status).json(response)
    })

    app.get("/user/get/mentors", serviceJWT_user.UserIsAutorised, async (req, res)=>{
        var response = await userController.getMentors(req)
        res.status(response.status).json(response)
    })

    app.post("/user/request/mentoring", serviceJWT_user.UserIsAutorised, async (req, res)=>{
        var response = await userController.requisteMentoring(req)
        res.status(response.status).json(response)
    })
}