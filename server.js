/*****************************************************************************************
 * @Purpose     : To create a server for get request from front end and send 
 *                responce Back.
 * @file        : server.js
 * @author      : Anuj
 * @version     : v0.1
 * @since       : 15-05-2019
 *****************************************************************************************/
/**
 * To give Path to each file
 */
var routers = require('../Server/routes/routes.js')
var express = require('express');
var cors = require('cors')
/**
 * Parse the JSON request Body
 */
var bodyParser = require('body-parser');
const chatController = require('./controller/chatController');
/**
 * create express App
 */

var app = express();
app.use(cors());
/**
 * To get the Path of database
 */
const mongoURI =require('./config/chatApp.config').url;
/**
 * =======Understand the use of dotenv=======
 */
require('dotenv').config();
var mongoose = require('mongoose');
/**
 * To connect server
 */
require('http').createServer(app)
app.use(
    bodyParser.urlencoded({
        extended : true
    })
)
/**
 * Parse request of content-type - application/json
 */
app.use(bodyParser.json());
app.use('/',routers);
/**
 * configuring the database
 */
mongoose.Promise = global.Promise;
/**
 * configuring the database
 */
mongoose
.connect(mongoURI,{ useNewUrlParser : true})
.then( () => { 
    /**
     * promises is fulfilled
     */
    console.log("MongoDb Connected")
})
.catch( err => {
    /**
     * promises rejected
     */
    console.log(err)
    process.exit();
}) 
/**
 * define a simple route
 */
app.get((req,res) => {
    res.json({message : "Welcome to chat App"})
}); 
/**
 * listen for request
 */
var port = process.env.port || 5000
const server = app.listen(port, () =>{
  console.log(' server is runing port: ' , port)
})

const io = require('socket.io').listen(server)
        io.sockets.on('connection', function(socket){ 
        connections = [];
        connections.push(socket);
        console.log("user connected ")
        socket.on('new_msg' ,(req) => {
            console.log("Request In server js ===>", req)
            chatController.addMessage(req,(err,result) => {
                if(err){
                    console.log("Error on server When Receiving Data")
                } 
                else{
                    io.emit("Sender",result);
                    console.log("sdeswdew",result);
                    
                }
                    
                    //io.emit(req.senderId,result)
                
            })
        })
    })
    /**
     * socket Disconnect
     */
    io.on('disconnect', (socket) => {
        connections.splice(connections.indexOf(socket),1)
        console.log('User disconnected')
    })
