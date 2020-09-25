const { response } = require('express')
const helpers = require('../services/helpers')
const avantageModel = require('../models').avantages

const REGEX_LINK = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/

class avantage extends helpers {
    static async register(data){
        var responseController = {
            success: "",
            errors: [],
            status: null
        }
        if(data.body.socityName && data.body.link && data.body.description){
            if(REGEX_LINK.test(data.body.link)){
                data.body.idAdmin = data.decoded.id
                await avantageModel.create(data.body)
                responseController.success = "avantage bien enregistrer!"
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
}

module.exports = avantage