/*****************************************************************************************
 * @Purpose     : To create a server for get request from front end and send 
 *                responce Back.
 * @file        : server.js
 * @author      : Anuj
 * @version     : v0.1
 * @since       : 15-05-2019
 *****************************************************************************************/

var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var app = express();
var routers = require('../Server/routes/routes')
var mongoose = require('mongoose');
var port = process.env.port || 5000

require('http').createServer(app)
app.use(bodyParser.json())
app.use(cors())
app.use(
    bodyParser.urlencoded({
        extended : false
    })
)

const mongoURI =require('./config/chatApp.config').url;
 mongoose
        .connect(mongoURI,{ useNewUrlParser : true})
        .then( () => console.log("MongoDb Connected"))
        .catch( err => console.log(err))
//var routers = require('./routes/routes');
app.use('/',routers)
app.listen(port, () =>{
    console.log(' server is ru nning on port: ' + port)
})
