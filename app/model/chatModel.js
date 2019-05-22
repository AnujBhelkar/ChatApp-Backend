/**
 * @Purpose : To Create Model for Chat Schema and Store data into database .
 * @file    : chatModel.js
 * @author  : Anuj
 * @since   : 18-05-2019              
 */
let mongoose =require('mongoose')

let Schema = mongoose.Schema({
    
    senderId   : {
        type        : String,
        require     : [true , "Sender id Required For Chat "] 
    },
    receiverId : {
        type        : String,
        require     : [true,"Receiver id Required For Chat "]
    },
    message      : {
        type        : String,
    require         : [true, " Message should required"] 
    }
},

    {
        timestamps   : true
    }
)

var chat = mongoose.model("chat", Schema);

function chatModel() { }
/**
 * store chat into database
 */
chatModel.prototype.chatting = (data, callback) => {
    console.log("chat data --->" , data)
    try{
        var newChat = new chat({
            senderId    : data.senderId,
            receiverId  : data.receiverId,
            message     : data.message
        })
        newChat.save((err,res) => {
            if(err){
                console.log("Message Save Error")
                callback(err)
            }
            else{
                console.log("message Saved Successfully !!")
                callback(null, res)
            }
        })
    }
    catch(error){
        console.log(error)
    }    
};

chatModel.prototype.getAllUserChat = (data,callback) => {
    chat.find({},(err,res) => {
        if(err){
            callback(err)
            console.log(err)
        }
        else{
            callback(null,res)
        }
    })
}
module.exports = new chatModel();