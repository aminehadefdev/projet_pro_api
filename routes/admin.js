const adminController = require('../controllers/adminController')
const videoContoller = require('../controllers/videoController')
const JWT = require('../services/JWT')

module.exports = (app)=>{
    app.post("/admin/register", JWT.AdminIsAutorisedLevelThree ,async (req, res)=>{
        var response = await adminController.register(req.body)
        res.status(response.status).json(response)
    })

    app.post("/admin/login", async (req, res)=>{
        var response = await adminController.login(req.body)
        res.status(response.status).json(response)
    })
    app.post("/admin/video/add", JWT.AdminIsAutorisedLevelOne ,async (req, res)=>{
        var response = await videoContoller.register(req)
        res.json(response)
    })
    app.post("/admin/RGPD-CGU", JWT.AdminIsAutorisedLevelThree, (req, res)=>{
        res.json({test: "ok"})
    })
    app.post("/admin/accept/user", JWT.AdminIsAutorisedLevelTwo, async (req, res)=>{
        var response = await adminController.acceptUser(req)
        res.status(response.status).json(response)
    })
}