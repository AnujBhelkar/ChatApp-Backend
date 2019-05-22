/*****************************************************************************************
 * @Purpose     : To create Srvices for chat Application.
 * @file        : chatServices.js
 * @author      : Anuj
 * @since       : 18-05-2019
 ****************************************************************************************/

 var chatModel = require('../app/model/chatModel');
/**
 * @param {*} data
 * @param {*} callback
 */
 exports.addMessage = (data, callback) => {
     console.log("in service==>",data);
     
    try{    
        chatModel.chatting(data,(err,result) => {
            if(err){
                console.log(" Service Error"+ err)
                callback(err)
            }
            else{
                callback(null, result)
                console.log(result);
            }
        })
    }
    catch(error){
        callback.send(error)
    }
 }
 /**
 * @param {*} data
 * @param {*} callback
 */
 exports.getAllUserChat = (data,callback) => {
     try{
        chatModel.getAllUserChat(data,(err,result) => {
            if(err){
                console.log("service Error" , err)
                callback(err)
            }
            else{
                callback(null,result)
            }
        })
     }
     catch(error){
         callback(error)
     }
 }



 