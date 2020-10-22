const videoModel = require('../models').Video
const helper = require('../services/helpers')
const fs = require('fs')
class video extends helper{
     static async register(data){
        var responseController = {
            success: null,
            successMessage: null,
            errors: [],
            status: 201,
            data : null
        }
        if(data.body.path && data.body.role && data.body.description && data.body.title && data.body.name && data.body.job && data.body.age){
            data.body.image = data.file.filename
            data.body.idAdmin = data.decoded.id
            var cre = await videoModel.create(data.body)
            responseController.data = cre
            responseController.status = 201
            responseController.success = "video bien enregestrer!"
        }else{
            this.checkIfDataIsNotEmpty(data.body.path, responseController, "Le champ path est obligatoir!")
            this.checkIfDataIsNotEmpty(data.body.role, responseController, "Le champ role est obligatoir!")
            this.checkIfDataIsNotEmpty(data.body.description, responseController, "Le champ description est obligatoir!")
            this.checkIfDataIsNotEmpty(data.body.title, responseController, "Le champ title est obligatoir!")
        }
        
        return responseController
     }
     static async update(data){
        var responseController = {
            success: null,
            successMessage: null,
            errors: [],
            status: null,
        }
        var video = {}
        data.body.idAdmin = data.decoded.id
        
        if(data.body.path)video.path = data.body.path
        if(data.body.role)video.role = data.body.role
        if(data.body.description)video.description = data.body.description
        if(data.body.title)video.title = data.body.title
        
        if(data.body.id){
            var up = await videoModel.update(video, {where: {id: data.body.id}})
            if(up[0] == 1){
                 data.status = 201
                 data.success = true
                 data.successMessage = "modification bien enregistrer!"
            }else if(up[0] == 1){
                 data.errors.push('modification impossible!')
                 data.success = false
                 data.status = 401
            }
        }else{
            data.errors.push('aucun id')
            data.success = false
            data.status = 401
        }
        return responseController
     }
     static async getVideo(data){
          var responseController = {
              success: null,
              successMessage: null,
              errors: [],
              status: null,
              video: null,
          }
          if(data.body.id){
              var video = await videoModel.findOne({
                  where: {id: data.body.id},
              })
              if(video != null){
                  responseController.video = video
                  responseController.success = true
                  responseController.successMessage = "ok"
                  responseController.status = 201
              }else{
                  responseController.success = false
                  responseController.errors.push('video introuvable!')
                  responseController.status = 401
              }
          }else{
              responseController.success = false
              responseController.errors.push('aucun id!!!')
              responseController.status = 401
          }
  
          return responseController
     }
     static async getVideos(){
        var responseController = {
            success: null,
            successMessage: null,
            errors: [],
            status: null,
            videos: null,
        }
        var videos = await videoModel.findAll()
        if(videos != null){
            responseController.videos = videos
            responseController.success = true
            responseController.successMessage = "ok"
            responseController.status = 201
        }else{
            responseController.success = false
            responseController.status = 401
            responseController.errors.push("aucune video trouver!")
        }
        return responseController
     }
     static async delete(data){
          var responseController = {
              success: null,
              successMessage: null,
              errors: [],
              status: null,
          }
          if(data.body.id){
            var nameImage = await videoModel.findOne({where:{id: data.body.id}})
            if(nameImage != null){
                nameImage = nameImage.image
                fs.unlink("./public/" + nameImage, (err) => {
                    if(err){
                        console.error(err)
                    }
                })
                var isDestroyd = await videoModel.destroy({where: {id: data.body.id}})
                if(isDestroyd){
                    responseController.success = true
                    responseController.successMessage = "video bien suprimer!"
                    responseController.status = 201
                  }else{
                    responseController.success = false
                    responseController.errors.push("video non suprimer!")
                    responseController.status = 201
                  }
                  
              }else{
                  responseController.status = 401
                  responseController.success = false
                  responseController.errors.push('aucun id!')
              }
            }else{
                responseController.status = 401
                responseController.status = false
                responseController.errors.push('video introuvable!')
            }
          return responseController
     }
}

module.exports = video