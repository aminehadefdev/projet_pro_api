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
}
module.exports = regle