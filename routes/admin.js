const adminController = require('../controllers/adminController')
const videoContoller = require('../controllers/videoController')
const avantageController = require('../controllers/avantageController')
const regleController = require('../controllers/regleController')

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
        res.status(response.status).json(response)
    })
    app.post("/admin/regle/add", JWT.AdminIsAutorisedLevelThree, async (req, res)=>{
        var response = await regleController.register(req)
        res.status(response.status).json(response)
    })
    app.post("/admin/accept/user", JWT.AdminIsAutorisedLevelTwo, async (req, res)=>{
        var response = await adminController.acceptUser(req)
        res.status(response.status).json(response)
    })
    app.post("/admin/aventage/add", JWT.AdminIsAutorisedLevelThree, async (req,res)=>{
        var response = await avantageController.register(req)
        res.status(response.status).json(response)
    })
}