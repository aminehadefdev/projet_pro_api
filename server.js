const express = require('express')
const app = express()
const env = require('dotenv').config().parsed
const bodyParser = require('body-parser')
const port = env.PORT || 8080
var cors = require('cors')
//const { Sequelize } = require('sequelize');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.use(cors())

// async function testConnextionDB(){
//     const sequelize = new Sequelize('projet_pro_development', 'root', null, {
//         host: '127.0.0.1',
//         dialect: 'mysql'
//     });

//     try {
//         await sequelize.authenticate();
//         console.log('connextion a la base de donner etablit')
//     } catch (error) {
//         console.error('echec connexion base de donner =>', error);
//     }
// }
// testConnextionDB()

const routes = require('./routes/index')(app)

app.listen(port, (err)=>{
    if(err)console.log(err)
    console.log("Server a l'ecoute au port " + port)
})