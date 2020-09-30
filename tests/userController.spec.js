const { expect } = require("chai");
const userController = require('../controllers/userController')

describe("user", ()=>{
    // it("register::ok", async ()=>{
    //     var data = {
    //         firstname: "amine",
    //         lastname: "hadef",
    //         email: "amine@gmail.com",
    //         password: "Amine1357@",
    //         description: "une super description",
    //         role: 1
    //     }
    //     let registerUser = await userController.register(data, true)
    //     expect(registerUser).to.eql({
    //         success: true,
    //         successMessage: "enregistrement reussi :)",
    //         errors: [],
    //         status: 201
    //     })
    // })

    it("register::empty firstname", async ()=>{
        var data = {
            firstname: "",
            lastname: "hadef",
            email: "amine@gmil.com",
            password: "amine1234",
            description: "une super description",
            role: 1
        }
        let registerUser = await userController.register(data)
        expect(registerUser).to.eql({
            success: false,
            successMessage: null,
            errors: ["le champ firstname est obligatoire!"],
            status: 401
        })
    })

    it("register::empty lastname", async ()=>{
        var data = {
            firstname: "amine",
            lastname: "",
            email: "amine@gmil.com",
            password: "amine1234",
            description: "une super description",
            role: 1
        }
        let registerUser = await userController.register(data)
        expect(registerUser).to.eql({
            success: false,
            successMessage: null,
            errors: ["le champ lastname est obligatoire!"],
            status: 401
        })
    })

    it("register::empty firsname and lasname", async ()=>{
        var data = {
            firstname: "",
            lastname: "",
            email: "amine@gmil.com",
            password: "amine1234",
            description: "une super description",
            role: 1
        }
        let registerUser = await userController.register(data)
        expect(registerUser).to.eql({
            success: false,
            successMessage: null,
            errors: ["le champ firstname est obligatoire!","le champ lastname est obligatoire!"],
            status: 401
        })
    })

    it("register::bad firsname", async ()=>{
        var data = {
            firstname: "123@",
            lastname: "hadef",
            email: "amine@gmil.com",
            password: "Amine1357@",
            description: "une super description",
            role: 1
        }
        let registerUser = await userController.register(data)
        expect(registerUser).to.eql({
            success: false,
            successMessage: null,
            errors: ["le firstname doit contenir que des lettre!"],
            status: 401
        })
    })
})