const express = require('express')
const router = express.Router()
const controller = require('../controller/user.controller')
router.post('/signin',controller.signIn)
router.post('/login',controller.login)
router.post('/createData',controller.create)
router.get('/?uid',controller.getData)
module.exports = router