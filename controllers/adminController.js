const helpers = require('../services/helpers')
const adminModel = require('../models').Admin
const bcrypt = require('bcryptjs')
const serviceJWT_admin = require('../services/JWT_admin');
const userModel = require('../models').user

const REGEX_EMAIL = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
const REGEX_NAME = /^([a-zA-Z]+)$/;
const REGEX_PASSWORD = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
const REGEX_ID = /^[0-9]+$/

class admin extends helpers{
    static async register(data){
        var responseController = {
            success: "",
            errors: [],
            status: null
        }
        if(data.firstname && data.lastname && data.email && data.password && data.niveau){
            if(REGEX_NAME.test(data.firstname) && REGEX_NAME.test(data.lastname) && REGEX_EMAIL.test(data.email) && REGEX_PASSWORD.test(data.password)){
                let adminExist = await adminModel.findOne({ where: { email: data.email } });
                if(!adminExist){
                    data.password = await bcrypt.hash(data.password, 10)
                    await adminModel.create(data)
                    responseController.success = "enregistrement reussi :)"
                    responseController.status = 201
                }else{
                    responseController.errors.push("email deja enregistrer!")
                    responseController.status = 401
                }
            }else{
                this.checkIfDataIsValide(REGEX_EMAIL, data.email, responseController, "le champ email doit etre valide exemple: toto@gmail.com!")
                this.checkIfDataIsValide(REGEX_NAME, data.firstname, responseController, "le firstname doit contenire que des lettre!")
                this.checkIfDataIsValide(REGEX_NAME, data.lastname, responseController, "le lastname doit contenire que des lettre!")
                this.checkIfDataIsValide(REGEX_PASSWORD, data.password, responseController, "le champ password doit contenire au minimum 8 caractaires dont au mois une majuscule une miniscule et un caractaiter special!")
            }
        }else{
            this.checkIfDataIsNotEmpty(data.firstname, responseController, "le champ firstname est obligatoir!")
            this.checkIfDataIsNotEmpty(data.lastname, responseController, "le champ lastname est obligatoir!")
            this.checkIfDataIsNotEmpty(data.email, responseController, "le champ email est obligatoir!")
            this.checkIfDataIsNotEmpty(data.password, responseController, "le champ password est obligatoir!")
            this.checkIfDataIsNotEmpty(data.niveau, responseController, "le champ niveau d'administration est obligatoir!")
        }
        return responseController
    }
    static async login(data) {
        var responseController = {
            success: "",
            errors: [],
            status: null,
            admin: {
                firstname: null,
                lastname: null,
                email: null,
                niveau: null
            },
            token: null
        }
        if(data.password && data.email){
            if(REGEX_EMAIL.test(data.email) && REGEX_PASSWORD.test(data.password)){
                var { email, password } = data
                var admin = await adminModel.findOne({
                    where: {
                        email: email
                    }
                })
                if (admin != null) {
                    if (await bcrypt.compare(password, admin.password)){
                        responseController.status = 201
                        responseController.success = "vous etre co"
                        responseController.token = serviceJWT_admin.generateTokenForAdmin(admin)
                        responseController.admin.id = admin.id
                        responseController.admin.niveau = admin.niveau
                        responseController.admin.firstname = admin.firstname
                        responseController.admin.lastname = admin.lastname
                        responseController.admin.email = admin.email
                    }else {
                        responseController.status = 400
                        responseController.errors.push("Informations incorectes")
                    }
                }else{
                    responseController.status = 400
                    responseController.errors.push("email non enregistrer!")
                }
            }else{
                this.checkIfDataIsValide(REGEX_EMAIL, data.email, responseController, "le champ email doit etre valide exemple: toto@gmail.com!")
                this.checkIfDataIsValide(REGEX_PASSWORD, data.password, responseController, "le champ password doit contenire au minimum 8 caractaires dont au mois une majuscule une miniscule et un caractaiter special!")
            }
        }else{
            this.checkIfDataIsNotEmpty(data.email, responseController, "le champ email est obligatoir!")
            this.checkIfDataIsNotEmpty(data.password, responseController, "le champ password est obligatoir!")
        }
        return responseController
    }
    static async getAdmin(data){
        var responseController = {
            success: null,
            successMessage: null,
            errors: [],
            status: null,
            admin: null,
        }
        if(data.body.id){
            var admin = await userModel.findOne({
                where: {id: data.body.id},
                attributes: ['id','firstname','lastname','email','niveau']
            })
            if(admin != null){
                responseController.admin = admin
                responseController.success = true
                responseController.successMessage = "ok"
                responseController.status = 201
            }else{
                responseController.success = false
                responseController.errors.push('utilisateur introuvable!')
                responseController.status = 401
            }
        }else{
            responseController.success = false
            responseController.errors.push('aucun id!!!')
            responseController.status = 401
        }

        return responseController
    }
    static async getAdmins(){
        var responseController = {
            success: null,
            successMessage: null,
            errors: [],
            status: null,
            admins: null,
        }
        var admins = await userModel.findAll({
            attributes: ['id','firstname','lastname','email','niveau']
        })
        if(admins != null){
            responseController.admins = admins
            responseController.success = true
            responseController.successMessage = "ok"
            responseController.status = 201
        }else{
            responseController.success = false
            responseController.errors.push('utilisateur introuvable!')
            responseController.status = 401
        }
        return responseController
    }
    static async acceptUser(data){
        var responseController = {
            success: "",
            errors: [],
            status: null,
        }
        if(data.body.id){
            var id = data.body.id
            var idAdmin = data.decoded.id
            if(REGEX_ID.test(id)){
                var userEsist = await userModel.findOne({where: {id: id}})
                if(userEsist !== null){
                    var update = await userModel.update({isAccepted: 1, idAdmin: idAdmin}, {where: {id: id}})
                    responseController.status = 201
                    responseController.success = "utilisateur bien accepter!"
                }else{
                    responseController.status = 403
                    responseController.errors.push('utilisateur introuvable!')
                }
            }else{
                responseController.status = 403
                responseController.errors.push('id incorecte!')
            }
        }else{
            responseController.status = 403
            responseController.errors.push('aucun id!')
        }
        return responseController
    }
    static async refuseUser(data){
        var responseController = {
            success: "",
            errors: [],
            status: null,
        }
        if(data.body.id){
            var id = data.body.id
            var idAdmin = data.decoded.id
            if(REGEX_ID.test(id)){
                var userEsist = await userModel.findOne({where: {id: id}})
                if(userEsist !== null){
                    var update = await userModel.update({isAccepted: 2, idAdmin: idAdmin}, {where: {id: id}})
                    responseController.status = 201
                    responseController.success = "utilisateur bien refuser!"
                }else{
                    responseController.status = 403
                    responseController.errors.push('utilisateur introuvable!')
                }
            }else{
                responseController.status = 403
                responseController.errors.push('id incorecte!')
            }
        }else{
            responseController.status = 403
            responseController.errors.push('aucun id!')
        }
        return responseController
    }
}

module.exports = admin