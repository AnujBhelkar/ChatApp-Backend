/*****************************************************************************************
 * @Purpose     : To create controller for chat Application.
 * @file        : chatServices.js
 * @author      : Anuj
 * @since       : 18-05-2019
 ****************************************************************************************/

 let service = require('../services/chatServices');
 exports.addMessage = (req,res) => {
     //console.log('controller' , req)
    try {
        var responseResult = {};
        service.addMessage(req.body, (err, result) => {
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
exports.getAllUserChat = (req,res) => {
    //console.log('controller' , req)
   try {
       var responseResult = {};
       service.getAllUserChat(req.body, (err, result) => {
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