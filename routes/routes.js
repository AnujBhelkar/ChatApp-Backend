const express = require('express');
const router = express.Router();
let userController = require('../controller/userController');
let chatController = require('../controller/chatController');
router.post('/login',userController.login);
router.post('/register',userController.registration);
router.post('/forgetPassword',userController.forgetPassword);
router.post('/addMessage',chatController.addMessage);
router.post('/verifyUser',userController.getUser)
router.get('/getAllUserChat',chatController.getAllUserChat);
router.get('/getAllUsers',userController.getAllUsers);
module.exports = router