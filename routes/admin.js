const adminController = require('../controllers/adminController')
const videoContoller = require('../controllers/videoController')
const avantageController = require('../controllers/avantageController')
const regleController = require('../controllers/regleController')

const serviceJWT_admin = require('../services/JWT_admin')

module.exports = (app)=>{
    app.post("/admin/register", serviceJWT_admin.AdminIsAutorisedLevelThree ,async (req, res)=>{
        var response = await adminController.register(req.body)
        res.status(response.status).json(response)
    })
    app.post("/admin/login", async (req, res)=>{
        var response = await adminController.login(req.body)
        res.status(response.status).json(response)
    })
    app.post("/admin/video/add", serviceJWT_admin.AdminIsAutorisedLevelOne ,async (req, res)=>{
        var response = await videoContoller.register(req)
        res.status(response.status).json(response)
    })
    app.post("/admin/regle/add", serviceJWT_admin.AdminIsAutorisedLevelThree, async (req, res)=>{
        var response = await regleController.register(req)
        res.status(response.status).json(response)
    })
    app.post("/admin/accept/user", serviceJWT_admin.AdminIsAutorisedLevelTwo, async (req, res)=>{
        var response = await adminController.acceptUser(req)
        res.status(response.status).json(response)
    })
    app.post("/admin/aventage/add", serviceJWT_admin.AdminIsAutorisedLevelThree, async (req,res)=>{
        var response = await avantageController.register(req)
        res.status(response.status).json(response)
    })
}