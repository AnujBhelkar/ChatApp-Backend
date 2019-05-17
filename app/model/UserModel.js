/*******************************************************************************************
 * @Purpose     : To create Schema for chat App And Store in the database
 * @file        : UserModel.js
 * @author      : Anuj
 * @version     : v0.1
 * @since       : 15-05-2019
 *******************************************************************************************/

 /**
  * Schema for user
  */
    const bcrypt = require('bcryptjs');
    const mongoose = require('mongoose');
    let saltRound = 10;

    var userSchema = new mongoose.Schema({
        firstName : {
            type        : String,
            required    : [true,"First Name Required"]
        },
        lastName  : {
            type        : String,
            required    : [true,"Last Name required"]
        },
        email     : {
            type        : String,
            required    : [true,"Email required"]
        },
        password  : {
            type        : String,
            required    : [true,"Password required"]
        },
    },
        {
            timestamps   : true
        })
    
    var user = mongoose.model('User', userSchema);
    function userModel()  { } 
    
    /**
     * Saving User Data into Database using Schema
     */

     userModel.prototype.registration = (req , res) => {
        /**
         * Find the user by email is already Exist or not
         */
         user.findOne({"email" : req.email},(err,data) => {
            //console.log(data);
            if(err){
                console.log(" Error in Registration ");
            }
            else{
                if(data == null ){
                    /**
                     * Create Hash of User Password
                     */
                    
                    req.password = bcrypt.hashSync(req.password,saltRound);
                    var newUser = new user ({
                        "firstName"    : req.firstName,
                        "lastName"     : req.lastName,
                        "email"        : req.email,
                        "password"     : req.password 
                    })
                    newUser.save((err,result) => {
                       if(err){
                           console.log(" Model Not Found ");
                           res(err)
                       }
                       else{
                           console.log("Register Succesfully");
                           res(null,result)
                       }
                    });
                }
                else{
                       //  console.log(data);
                    console.log(" User is Already Register. ")
                    res("User Already Register")
                }
            }
         })           
     }

     /*
      * Find user is Already registered
      */
     userModel.prototype.login = (data ,callback ) =>{
         user.findOne({"email" : data.email},(err,res) => {
            //console.log(res);    
            if(err){
                    callback(err);
                }               
                else if(res != null){
                  //console.log(data[0])
                        bcrypt.compare(data.password,res.password)
                            .then(ress => {
                                if(ress){
                                    console.log("Successfully Logged in !!")
                                    callback(null,res)
                                }
                                else{
                                    //console.log(" Password Is Incorrect ")
                                    callback(" Password Is Incorrect ")
                                }
                            })
                    }
                else{
                   // console.log(" Invalid User ")
                    callback(" Invalid User ")
                }
         })
     }
     /**
      * Find Enter Email is Available In database 
      */
     userModel.prototype.getEmail = (data,callback) => {
         user.findOne({"email" : data.email},(err,result) => {
             if(err){
                 res(err)
             }
             else if(result != null && data.email == result.email){
                callback(null, result)
             }
             else{
                 callback(" Incorrect Email")
             }
         })
     }
     /**
      * Get All user Available In Database
      */
     userModel.prototype.getAllUser = ( data , callback) => {
         user.find({},(err,result) => {
            if(err){
                callback(err)
            }
            else{
                callback(null,result)
            }
         })
     }

     /**
      * Change password of Available user In Database
      */
        userModel.prototype.setNewPassword = (data , callback) =>{
           
            let newPass = bcrypt.hashSync(data.password , saltRound);
            console.log(newPass);
                user.update({ _id : data.decoded.payload._id},{password : newPass}, (err,result) => {
                    console.log(" "+data.decoded.payload._id)
                    if(err){
                        console.log(err)
                        callback(err)
                    }
                    else{
                        console.log("Password Update Successfully");
                        console.log(result)
                        callback(null,result)
                    }
                })
            // user.find({ email : data.email},(err,result) =>{
                
            //     if(err){
            //         callback(err)
            //     }
            //     else{
            //      result.password = bcrypt.hashSync(data.newPassword ,saltRound)
            //      console.log(data.password + " "+result.password)
            //         bcrypt.compare(data.password,result.password)
            //             .then((response) =>{
            //                 data.password = result.password;
            //                 console.log("Password Change Successfully")
            //                 callback(null,data)
            //             })
            //             .catch((err) =>{
            //                 console.log(" Incorrect Password ");
            //                 callback(err);
            //             })       
            //     }
            // })
        }

     module.exports = new userModel();