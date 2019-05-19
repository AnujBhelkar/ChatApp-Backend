/*****************************************************************************************
 * @Purpose     : To create controller for chat Application.
 * @file        : chatServices.js
 * @author      : Anuj
 * @since       : 18-05-2019
 ****************************************************************************************/

 let service = require('../services/chatServices');
 
 exports.addMessage = (data,callback) =>{
    /**
     * @param {*} data
     * @param {*} callback
     */
        service.addMessage(data,(err,result) => {
            var response = {};
            if(err){
                response.success = false;
                response.error = err;
                callback.status(400).response;
            }
            else{
                response.success = true;
                response.result = result;
                callback.status(200).response;

            }
        })
 }
 exports.getAllUserChat = (data,callback) =>{
    /**
     * @param {*} data
     * @param {*} callback
     */
        service.getAllUserChat(data,(err,result) => {
            var response = {};
            if(err){
                response.success = false;
                response.error = err;
                callback.status(400).response;
            }
            else{
                response.success = true;
                response.result = result;
                callback.status(200).response;

            }
        })
 }