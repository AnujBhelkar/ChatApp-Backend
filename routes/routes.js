const express = require('express')
const router = express.Router();
let userController = require('../controller/userController')
router.post('/login',userController.login)
router.post('/register',userController.registration)
router.post('/forgetPassword',userController.forgetPassword)
module.exports = router