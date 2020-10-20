const express = require('express')
const app = express()
const env = require('dotenv').config().parsed
const bodyParser = require('body-parser')
const port = env.PORT || 8080
const cors = require('cors')
const multer = require('multer')

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.use(express.static(__dirname + '/public'));
app.use(cors())



const routes = require('./routes/index')(app)

app.listen(port, (err)=>{
    if(err)console.log(err)
    console.log("Server a l'ecoute au port " + port)
})