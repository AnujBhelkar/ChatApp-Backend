/***************************************************************************************
 * @Purpose     : To create user Controller to handle the incoming Data\
 * @file        : userController.js
 * @author      : Anuj
 * @version     : v0.1
 ***************************************************************************************/

 var userService  = require('../services/userServices')

 exports.registration = (req, res) => {
    try {
        var responseResult = {}
        userService.registration(req.body, (err, result) => {
            if (err) {
                responseResult.success = false;
                responseResult.error = err;
                res.status(400).send(responseResult);
            }
            else {
                responseResult.success = true;
                responseResult.result = result;
                res.status(200).send(responseResult)
            }
        })
    } catch (err) {
        res.send(err);
    }
}/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.login = (req, res) => {
    try {
        var responseResult = {};
        console.log("req body in controller ",req.body)
        userService.login(req.body, (err, result) => {
            if (err) {
                console.log(req.body);
                
                responseResult.success = false;
                responseResult.error = err;
                res.status(400).send(responseResult);
            }
            else {
                responseResult.success = true;
                responseResult.result = result;
                res.status(200).send(responseResult)
            }
        })
    } catch (err) {
        res.send(err);
    }
}
/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.forgetPassword = (req,res) => {
    try {
        var responseResult = {};
        userService.forgetPassword(req.body, (err, result) => {
            if (err) {
                //console.log(req.body);
                
                responseResult.success = false;
                responseResult.error = err;
                res.status(400).send(responseResult);
            }
            else {
                responseResult.success = true;
                responseResult.result = result;
                res.status(200).send(responseResult)
            }
        })
    } catch (err) {
        res.send(err);
    }

}