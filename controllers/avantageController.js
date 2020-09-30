const { response } = require('express')
const helpers = require('../services/helpers')
const avantageModel = require('../models').avantages

const REGEX_LINK = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/

class avantage extends helpers {
    static async register(data){
        var responseController = {
            success: null,
            successMessage: null,
            errors: [],
            status: null
        }
        if(data.body.socityName && data.body.link && data.body.description){
            if(REGEX_LINK.test(data.body.link)){
                data.body.idAdmin = data.decoded.id
                await avantageModel.create(data.body)
                responseController.successMessage = "avantage bien enregistrer!"
                responseController.success = true
                responseController.status = 201
            }else{
                this.checkIfDataIsValide(REGEX_LINK, data.body.link, responseController, "link non valide!")
            }
        }else{
            this.checkIfDataIsNotEmpty(data.body.socityName, responseController, "le champ socityName est obligatoir!")
            this.checkIfDataIsNotEmpty(data.body.link, responseController, "le champ link est obligatoir!")
            this.checkIfDataIsNotEmpty(data.body.description, responseController, "le champ description est obligatoir!")
        }

        return responseController
    }
    static async getAvantage(data){
        var responseController = {
            success: null,
            successMessage: null,
            errors: [],
            status: null,
            avantage: null,
        }

        if(data.body.id){
            var avantage = await avantageModel.findOne({
                where: {id: data.body.id}
            })
            if(avantage != null){
                responseController.avantage = avantage
                responseController.success = true
                responseController.successMessage = 'ok'
                responseController.status = 201
            }else{
                responseController.success = false
                responseController.successMessage = 'avantage introuvanle!'
                responseController.status = 401
            }
        }else{
            responseController.success = false
            responseController.successMessage = 'id inconue!'
            responseController.status = 401
        }

        return responseController
    }

    static async getAvantages(){
        var responseController = {
            success: null,
            successMessage: null,
            errors: [],
            status: null,
            avantages: null,
        }

        var avantages = await avantageModel.findAll()

        if(avantages != null){
            responseController.avantages = avantages
            responseController.success = true
            responseController.successMessage = 'ok'
            responseController.status = 201
        }else{
            responseController.success = false
            responseController.successMessage = 'avantages introuvanle!'
            responseController.status = 401
        }
        return responseController
    }
}

module.exports = avantage