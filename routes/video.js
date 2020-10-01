const videoController = require('../controllers/videoController')

module.exports = (app)=>{
    app.get("/videos", async (req, res)=>{
        var response = await videoController.getVideos()
        res.status(response.status).json(response)
    })
    app.get("/video", async (req, res)=>{
        var response = await videoController.getVideo(req)
        res.status(response.status).json(response)
    })
    
}