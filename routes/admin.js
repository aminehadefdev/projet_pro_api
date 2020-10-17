const adminController = require('../controllers/adminController')
const videoContoller = require('../controllers/videoController')
const avantageController = require('../controllers/avantageController')
const regleController = require('../controllers/regleController')
const userController = require('../controllers/userController')

const serviceJWT_admin = require('../services/JWT_admin')
const { use } = require('chai')

module.exports = (app)=>{
    app.post("/admin/register", serviceJWT_admin.AdminIsAutorisedLevelThree ,async (req, res)=>{
        var response = await adminController.register(req.body)
        res.status(response.status).json(response)
    })
    app.post("/admin/login", async (req, res)=>{
        var response = await adminController.login(req.body)
        res.status(response.status).json(response)
    })
    app.post("/admin/accept/user", serviceJWT_admin.AdminIsAutorisedLevelTwo, async (req, res)=>{
        var response = await adminController.acceptUser(req)
        res.status(response.status).json(response)
    })
    app.post("/admin/refuse/user", serviceJWT_admin.AdminIsAutorisedLevelTwo, async (req, res)=>{
        var response = await adminController.refuseUser(req)
        res.status(response.status).json(response)
    })
    app.post("/admin/user/delete", serviceJWT_admin.AdminIsAutorisedLevelTwo, async (req, res)=>{
        var response = await userController.delete(req)
        res.status(response.status).json(response)
    })
    app.post("/admin/delete", serviceJWT_admin.AdminIsAutorisedLevelTwo, async (req, res)=>{
        var response = await adminController.delete(req)
        res.status(response.status).json(response)
    })
    app.get("/admin/get", serviceJWT_admin.AdminIsAutorisedLevelTwo, async (req, res)=>{
        var response = await adminController.getAdmin(req)
        res.status(response.status).json(response)
    })
    app.get("/admin/gets", serviceJWT_admin.AdminIsAutorisedLevelTwo, async (req, res)=>{
        var response = await adminController.getAdmins()
        res.status(response.status).json(response)
    })
    app.post("/admin/video/add", serviceJWT_admin.AdminIsAutorisedLevelOne ,async (req, res)=>{
        var response = await videoContoller.register(req)
        res.status(response.status).json(response)
    })
    app.post("/admin/video/update", serviceJWT_admin.AdminIsAutorisedLevelOne, async (req, res)=>{
        var response = await videoContoller.update(req)
        res.status(response.status).json(response)
    })
    app.post("/admin/video/delete", serviceJWT_admin.AdminIsAutorisedLevelThree, async (req, res)=>{
        var response = await videoContoller.delete(req)
        res.status(response.status).json(response)
    })
    app.post("/admin/regle/add", serviceJWT_admin.AdminIsAutorisedLevelThree, async (req, res)=>{
        var response = await regleController.register(req)
        res.status(response.status).json(response)
    })
    app.post("/admin/regle/update", serviceJWT_admin.AdminIsAutorisedLevelThree, async (req, res)=>{
        var response = regleController.update(req)
        res.status(response.status).json(response)
    })
    app.post("/admin/regle/delete", serviceJWT_admin.AdminIsAutorisedLevelThree, (req, res)=>{
        var response = regleController.delete(req)
        res.status(response.status).json(response)
    })
    app.post("/admin/aventage/add", serviceJWT_admin.AdminIsAutorisedLevelThree, async (req,res)=>{
        var response = await avantageController.register(req)
        res.status(response.status).json(response)
    })
    app.post("/admin/avantage/update", serviceJWT_admin.AdminIsAutorisedLevelTwo, async (req, res)=>{
        var response = await avantageController.update(req)
        res.status(response.status).json(response)
    })
    app.post("/admin/avantage/delete", serviceJWT_admin.AdminIsAutorisedLevelTwo, async (req, res)=>{
        var response = await avantageController.delete(req)
        res.status(response.status).json(response)
    })

    app.get('/admin/get/users', serviceJWT_admin.AdminIsAutorisedLevelOne, async (req, res)=>{
        var response = await userController.getAll()
        res.status(response.status).json(response)
    })

    app.post("/admin/upgrad", serviceJWT_admin.AdminIsAutorisedLevelThree, async (req, res)=>{
        var response = await userController.upgradAdmin(req)
        res.status(response.status).json(response)
    })
    app.post("/admin/downgrade", serviceJWT_admin.AdminIsAutorisedLevelThree, async (req, res)=>{
        var response = await userController.downgrade(req)
        res.status(response.status).json(response)
    })
}