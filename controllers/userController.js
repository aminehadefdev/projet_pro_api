
const helpers = require('../services/helpers')
const userModel = require('../models').user
const adminModel = require('../models').Admin
const requestMentoringModel = require('../models').requestMentoring
const bcrypt = require('bcryptjs')
const serviceJWT_user = require('../services/JWT_user')

const REGEX_EMAIL = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
const REGEX_NAME = /^([a-zA-Z]+)$/;
const REGEX_PASSWORD = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
// const REGEX_BIRTHDAY = /^([0-9]{4})\-([0-9]{2})\-([0-9]{2})$/;

class User extends helpers{
    static async register(data){
        var responseController = {
            success: null,
            successMessage: null,
            errors: [],
            status: null
        }
        if(data.body.firstname && data.body.lastname && data.body.email && data.body.password && data.body.description && data.body.role && data.body.job){
            if(REGEX_NAME.test(data.body.firstname) && REGEX_NAME.test(data.body.lastname) && REGEX_EMAIL.test(data.body.email) && REGEX_PASSWORD.test(data.body.password)){
                let userExist = await userModel.findOne({ where: { email: data.body.email } });
                if(!userExist){
                    data.body.password = await bcrypt.hash(data.body.password, 10)
                    data.body.isAccepted = 0
                    data.body.photoProfile = data.file.filename
                    var newUser = await userModel.create(data.body)
                    if(newUser){
                        responseController.successMessage = "enregistrement reussi :)"
                        responseController.success = true
                        responseController.status = 201
                    }else{
                        responseController.success = false
                        responseController.errors.push('un probles est survenu!')
                        responseController.status = 409
                    }
                }else{
                    responseController.errors.push("email deja enregistrer!")
                    responseController.status = 409
                }
            }else{
                this.checkIfDataIsValide(REGEX_EMAIL, data.body.email, responseController, "le champ email doit etre valide exemple: toto@gmail.com!")
                this.checkIfDataIsValide(REGEX_NAME, data.body.firstname, responseController, "le firstname doit contenir que des lettre!")
                this.checkIfDataIsValide(REGEX_NAME, data.body.lastname, responseController, "le lastname doit contenir que des lettre!")
                this.checkIfDataIsValide(REGEX_PASSWORD, data.body.password, responseController, "le champ password doit contenir au minimum 8 caracteres dont au moins une majuscule une minuscule et un caracter special!")
            }
        }else{
            this.checkIfDataIsNotEmpty(data.body.firstname, responseController, "le champ firstname est obligatoire!")
            this.checkIfDataIsNotEmpty(data.body.lastname, responseController, "le champ lastname est obligatoire!")
            this.checkIfDataIsNotEmpty(data.body.email, responseController, "le champ email est obligatoire!")
            this.checkIfDataIsNotEmpty(data.body.password, responseController, "le champ password est obligatoire!")
            this.checkIfDataIsNotEmpty(data.body.description, responseController, "le champ description est obligatoire!")
            this.checkIfDataIsNotEmpty(data.body.role, responseController, "le champ role est obligatoire!")
            this.checkIfDataIsNotEmpty(data.body.job, responseController, "le champ job est obligatoire!")

        }
        return responseController
    }
    static async login(data) {
        var responseController = {
            success: null,
            successMessage: null,
            errors: [],
            status: null,
            user: {
                role: null,
                firstname: null,
                lastname: null,
                email: null,
                description: null,
                job: null,
                photoProfile: null
            },
            token: null
        }
        if(data.password && data.email){
            if(REGEX_EMAIL.test(data.email) && REGEX_PASSWORD.test(data.password)){
                var { email, password } = data
                var user = await userModel.findOne({
                    where: {
                        email: email
                    }
                })
                if (user != null) {
                    if (await bcrypt.compare(password, user.password)){
                        if(user.isAccepted == 1){
                            responseController.status = 201
                            responseController.successMessage = "vous etre co"
                            responseController.success = true
                            responseController.token = serviceJWT_user.generateTokenForUser(user)
                            //responseController.user.id = user.id
                            responseController.user.role = user.role
                            responseController.user.firstname = user.firstname
                            responseController.user.lastname = user.lastname
                            responseController.user.email = user.email
                            responseController.user.description = user.description
                            responseController.user.job = user.job
                            responseController.user.photoProfile = user.photoProfile

                        }else if(user.isAccepted == 2){
                            responseController.status = 401
                            responseController.errors.push("vous avez etait refuser!")
                            responseController.success = false
                        }
                        else if(user.isAccepted == 0){
                            responseController.status = 401
                            responseController.errors.push("votre dossier est en cour de traitement!")
                            responseController.success = false
                        }
                    }else {
                        responseController.status = 401
                        responseController.errors.push("Informations incorectes")
                        responseController.success = false
                    }
                }else{
                    responseController.status = 401
                    responseController.errors.push("email non enregistrer!")
                    responseController.success = false
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
    static async search(data){
        var responseController = {
            success: null,
            errors: [],
            status: 201,
            data: null,
        }
        var {job} = data.query
        if(job){
            responseController.data = await userModel.findAll({
                where: {
                    job: job,
                    role: 1
                },
                attributes: [
                    "id",
                    "firstname",
                    "lastname",
                    "description",
                    "job",
                    "photoProfile",
                ]
            })
        }
        return responseController
    }
    static async getMentor(data){
        var responseController = {
            success: null,
            successMessage: null,
            errors: [],
            status: null,
            data: null,
        }
        
        if(data.body.id){
            responseController.data = await userModel.findOne({
                where: {
                    id: data.body.id
                },
                attributes: [
                    "id",
                    "firstname",
                    "lastname",
                    "description",
                    "job"
                ]
            })
            if(responseController.data){
                responseController.status = 201
                responseController.successMessage = "utilisateur trouver!"
                responseController.success = true
            }else{
                responseController.status = 403
                responseController.success = false
                responseController.successMessage = "utilisateur introuvable"
            }
        }else{
            responseController.status = 403
            responseController.success = false
            responseController.successMessage = "id incorecte!"
        }

        return responseController
    }
    static async getMentors(data){
        var responseController = {
            success: null,
            errors: [],
            status: 201,
            data: null,
        }

        responseController.data = await requestMentoringModel.findAll({
            where:{idMentorer: data.decoded.id},
            include: [{model: userModel, attributes: ["id", "firstname", "lastname", "description", "role", "isAccepted"]}]
        })

        if(responseController.data != null){
            responseController.success = true
        }else{
            responseController.errors.push('aucun utilisateur!')
            responseController.success = false
        }

        return responseController
    }
    static async requisteMentoring(data){
        var responseController = {
            success: null,
            successMessage: null,
            errors: [],
            status: null,
        }
        if(data.body.idMentor){
            data.body.idMentorer = parseInt(data.decoded.id)
            data.body.idMentor = parseInt(data.body.idMentor)
            data.body.isAccepted = 0
            var requestMentoringExist = await requestMentoringModel.findOne({
                where:{
                    idMentor: data.body.idMentor,
                    idMentorer: data.body.idMentorer
                }
            })
            if(requestMentoringExist == null){
                await requestMentoringModel.create(data.body)
                responseController.status = 201
                responseController.successMessage = "demande de mentoring bien envoyer!"
                responseController.success = true
            }else{
                responseController.status = 403
                responseController.errors.push('vous avez deja une demande de mentoring!')
                responseController.success = false
            }
        }else{
            responseController.status = 403
            responseController.errors.push('id mentore non resegnier!')
            responseController.success = false
        }

        return responseController
        
    }
    static async crud(data){
        var responseController = {
            success: "",
            successMessage: null,
            errors: [],
            status: 201
        }
        var user = {}
        if(data.body.firstname)user.firstname = data.body.firstname
        if(data.body.lastname)user.lastname = data.body.lastname
        if(data.body.email)user.email = data.body.email
        if(data.body.description)user.description = data.body.description
        if(data.body.job)user.job = data.body.job

        var up =  await userModel.update(user, {
            where: {id: data.decoded.id}
        })

        if(up[0] == 1){
            responseController.status = 201
            responseController.successMessage = "modification bien enregistrer!"
            responseController.success = true
        }else if(up[0] == 0){
            responseController.errors.push("modification impossible!")
            responseController.status = 403
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
            if(await userModel.destroy({where: {id: data.body.id}})){
                responseController.success = true
                responseController.successMessage = "user bien suprimer!"
                responseController.status = 201
            }else{
                responseController.success = true
                responseController.errors.push("user bien suprimer!")
                responseController.status = 201
            }
            
        }else{
            responseController.status = 401
            responseController.status = false
            responseController.errors.push('aucun id!')
        }
        return responseController
    }
    static async getAll(){
        var responseController = {
            success: null,
            successMessage: null,
            errors: [],
            data: null,
            status: null,
        }

        var users = await userModel.findAll({
            include:{
                model: adminModel,
                attributes:["id","firstname", "lastname", "email"]
            },
            attributes:["id","firstname", "lastname", "email", "description", "role", "isAccepted", "idAdmin", "job"]
        })
        if(users){
            responseController.data = users
            responseController.success = true
            responseController.status = 201
        }
        return responseController
    }
}
module.exports = User