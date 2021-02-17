const userController = require('../controllers/userController')
const serviceJWT_user = require('../services/JWT_user')
const multer  = require('multer')

var upload = multer({ dest: 'public/', fileFilter: (req, file,cb)=>{
    if(file.mimetype !== 'image/png' && file.mimetype !== 'image/jpeg'){
        return cb(null, false, console.log(file))
    }
    cb(null, true)
}})

module.exports = (app)=>{
    app.post("/user/register", upload.single('photoProfile') ,async (req, res)=>{
        var response = await userController.register(req)
        res.status(response.status).json(response)
    })
    app.post('/user/ping', serviceJWT_user.UserIsAutorised, async (req, res)=>{
        var response = await userController.ping()
        res.json(response)
    })
    app.post('/user/crud', serviceJWT_user.UserIsAutorised, async (req, res)=>{
        var response = await userController.crud(req)
        res.status(response.status).json(response)
    })
    app.post("/verify/email", async (req, res)=>{
        var response = await userController.confirmEmail(req)
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