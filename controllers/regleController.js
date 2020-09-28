const helpers = require('../services/helpers')
const regleModel = require('../models').regles

class regle extends helpers{
    static async register(data){
        var responseController = {
            success: "",
            errors: [],
            status: null
        }
        if(data.body.content && data.body.title){
            data.body.idAdmin = data.decoded.id
            await regleModel.create(data.body)
            responseController.success = "regle bien enregistrer!"
            responseController.status = 201
        }else{
            this.checkIfDataIsNotEmpty(data.body.content, responseController, "le champ content est obligatoir!")
            this.checkIfDataIsNotEmpty(data.body.title, responseController, "le champ title est obligatoir!")
        }

        return responseController
    }
    static async update(data){
        var responseController = {
            success: "",
            errors: [],
            status: null
        }
        if(data.body.id){
            var regleExiste = await regleModel.findOne({where: {id: data.body.id}})
            if(regleExiste != null){
                var body = data.body
                await regleModel.update({body}, {where: data.body.id})
                responseController.success = "regle bine mis a joure!"
                responseController.status = 201
            }else{
                responseController.errors.push("aucun id!")
                responseController.status = 403
            }

        }else{
            responseController.errors.push("aucun id!")
            responseController.status = 403
        }
        return responseController
    }
}
module.exports = regle