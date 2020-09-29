
const helpers = require('../services/helpers')
const userModel = require('../models').user
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
            success: "",
            errors: [],
            status: null
        }
        if(data.firstname && data.lastname && data.email && data.password && data.description && data.role){
            if(REGEX_NAME.test(data.firstname) && REGEX_NAME.test(data.lastname) && REGEX_EMAIL.test(data.email) && REGEX_PASSWORD.test(data.password)){
                let userExist = await userModel.findOne({ where: { email: data.email } });
                if(!userExist){
                    data.password = await bcrypt.hash(data.password, 10)
                    data.isAccepted = 0
                    await userModel.create(data)
                    responseController.success = "enregistrement reussi :)"
                    responseController.status = 201
                }else{
                    responseController.errors.push("email deja enregistrer!")
                    responseController.status = 401
                }
            }else{
                this.checkIfDataIsValide(REGEX_EMAIL, data.email, responseController, "le champ email doit etre valide exemple: toto@gmail.com!")
                this.checkIfDataIsValide(REGEX_NAME, data.firstname, responseController, "le firstname doit contenir que des lettre!")
                this.checkIfDataIsValide(REGEX_NAME, data.lastname, responseController, "le lastname doit contenir que des lettre!")
                this.checkIfDataIsValide(REGEX_PASSWORD, data.password, responseController, "le champ password doit contenir au minimum 8 caracteres dont au moins une majuscule une minuscule et un caracter special!")
            }
        }else{
            this.checkIfDataIsNotEmpty(data.firstname, responseController, "le champ firstname est obligatoire!")
            this.checkIfDataIsNotEmpty(data.lastname, responseController, "le champ lastname est obligatoire!")
            this.checkIfDataIsNotEmpty(data.email, responseController, "le champ email est obligatoire!")
            this.checkIfDataIsNotEmpty(data.password, responseController, "le champ password est obligatoire!")
            this.checkIfDataIsNotEmpty(data.description, responseController, "le champ description est obligatoire!")
            this.checkIfDataIsNotEmpty(data.role, responseController, "le champ role est obligatoire!")
        }
        return responseController
    }
    static async login(data) {
        var responseController = {
            success: "",
            errors: [],
            status: null,
            user: {
                role: null,
                firstname: null,
                lastname: null,
                email: null
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
                            responseController.success = "vous etre co"
                            responseController.token = serviceJWT_user.generateTokenForUser(user)
                            responseController.user.id = user.id
                            responseController.user.role = user.role
                            responseController.user.firstname = user.firstname
                            responseController.user.lastname = user.lastname
                            responseController.user.email = user.email
                        }else if(user.isAccepted == 2){
                            responseController.status = 401
                            responseController.errors.push("vous avez etait refuser!")
                        }
                        else if(user.isAccepted == 0){
                            responseController.status = 401
                            responseController.errors.push("votre dossier est en cour de traitement!")
                        }
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
                    "job"
                ]
            })
        }
        return responseController
    }
    static async getMentor(data){
        var responseController = {
            success: null,
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
                responseController.success = "utilisateur trouver!"
            }else{
                responseController.status = 403
                responseController.success = "utilisateur introuver!"
            }
        }else{
            responseController.status = 403
            responseController.success = "id incorect"
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

        return responseController
    }
    static async requisteMentoring(data){
        var responseController = {
            success: null,
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
                responseController.success = "demande de mentoring bien envoyer!"
            }else{
                responseController.status = 403
                responseController.errors.push('vous avez deja une demande de mentoring!')
            }
        }else{
            responseController.status = 403
            responseController.errors.push('id mentore non resegnier!')
        }

        return responseController
        
    }
}
module.exports = User