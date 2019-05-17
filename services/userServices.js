/******************************************************************************************
 * @Purpose     : Creat user services that will send incoming data to user model and 
 *                save to database. Fetch correct data when Login.
 * @file        : userServices.js
 * @author      : Anuj
 * @version     : v0.1 
 * @since       : 15-05-2019
 *****************************************************************************************/

 const userModel = require('../app/model/UserModel');

/**
 * @param {*} req
 * @param {*} res
 */

 exports.login =(req,res) =>{
    try{
       // console.log("service use data : " + req.password)
        userModel.login(req, (err,data) =>{
            if(err){
                console.log("Log Service Error ")
                res(err)
            }
            else{
                console.log("Service In", data);
                res(null,data)
            }
        })
    }
    catch(error){
        res.send(error);
    }
 }

 /**
 * @param {*} req
 * @param {*} res
 */

exports.registration =(req,res) =>{
    try{
        userModel.registration(req, (err,data) =>{
            if(err){
                console.log("Log Service Error ")
                res(err)
            }
            else{
                console.log("Service In", data);
                res(null,data)
            }
        })
    }
    catch(error){
        res.send(error);
    }
 }

 /**
 * @param {*} data
 * @param {*} callback
 */

exports.getEmail =(data,callback) =>{
    try{
        userModel.getEmail(data, (err,result) =>{
            if(err){
                console.log("Log Service Error ")
                res(err)
            }
            else{
                console.log("Service In", result);
                res(null,result)
            }
        })
    }
    catch(error){
        callback.send(error);
    }
 }

 /**
 * @param {*} data
 * @param {*} callback
 */

exports.getAllUsers =(data,callback) =>{
    try{
        userModel.getAllUsers(data, (err,result) =>{
            if(err){
                console.log("Log Service Error ")
                res(err)
            }
            else{
                console.log("Service In", result);
                res(null,result)
            }
        })
    }
    catch(error){
        callback.send(error);
    }
 }

 /**
 * @param {*} data
 * @param {*} callback
 */
 exports.forgetPassword = (data,callback) => {
     try{
            userModel.setNewPassword(data,(err,result) => {
                if(err){
                    console.log("Log Service Error ")
                    callback(err)
                }
                else{
                    console.log("Service In")
                    callback(null,result)
                }
            })
     }
     catch(error){
         callback.send(error)
     }
}