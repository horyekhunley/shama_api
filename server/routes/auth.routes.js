const { login, logout } = require('../controllers/auth.controller')
const express = require('express')
const router = express.Router()

router.route('/login').post( login )

router.route('/logout').get( logout )


module.exports = router