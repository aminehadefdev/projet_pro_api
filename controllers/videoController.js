const REGEX_URL_YT = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})?$/
const videoModel = require('../models').Video
const helper = require('../services/helpers')

class video extends helper{
    static async register(data){
       var responseController = {
            success: "",
            errors: [],
            status: null,
       }
       var idAdmin = data.decoded.id
        if(data.body.path && data.body.role && data.body.description && data.body.title){
            var {path, role, description, title} = data.body
            await videoModel.create({path, role, description, title, idAdmin})
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
}

module.exports = video