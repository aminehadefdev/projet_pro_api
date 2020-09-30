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
    static async getRegle(data){
        var responseController = {
            success: null,
            successMessage: null,
            errors: [],
            status: null,
            regle: null,
        }

        if(data.body.id){
            var regle = await regleModel.findOne({where: {id: data.body.id}})
            if(regle != null){
                responseController.regle = regle
                responseController.status = 201
                responseController.success = true
                responseController.successMessage = "ok"
            }else{
                responseController.status = 401
                responseController.errors.push('echec de recuperation de la regle!')
                responseController.success = false
            }
        }else{
            responseController.status = 401
            responseController.errors.push('aucun id!')
            responseController.success = false
        }

        return responseController
    }
    static async getRegles(){
        var responseController = {
            success: null,
            successMessage: null,
            errors: [],
            status: null,
            regles: null,
        }
        var regles = await regleModel.findAll()
        if(regles != null){
            responseController.regles = regles
            responseController.status = 201
            responseController.success = true
            responseController.successMessage = "ok"
        }else{
            responseController.status = 401
            responseController.errors.push('echec de recuperation de la regle!')
            responseController.success = false
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
            if(await regleModel.destroy({where: {id: data.body.id}})){
                responseController.success = true
                responseController.successMessage = "regle bien suprimer!"
                responseController.status = 201
            }else{
                responseController.success = true
                responseController.errors.push("regle bien suprimer!")
                responseController.status = 201
            }
            
        }else{
            responseController.status = 401
            responseController.status = false
            responseController.errors.push('aucun id!')
        }
        return responseController
    }
}
module.exports = regle