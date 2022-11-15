const User = require('../models/user.model')
const jsonwebtoken = require('jsonwebtoken')
const { expressjwt: jwt } = require('express-jwt')
require('dotenv').config()

// sign in
exports.login = async (req, res) => {
    try {
        let user = await User.findOne({ email: req.body.email })
        if(!user) return res.status(404).json({ error: 'User not found' })

        const token = jsonwebtoken.sign({ _id: user._id}, process.env.JWT_SECRET)
        res.cookie('t', token, { expire: new Date() + 9999 })

        return res.status(200).json({
            token,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email
            }
        })
    } catch (err) {
        return res.status(400).json({
            message: "User could not sign in",
            err,
          })
    }
}
exports.logout = async (req, res) => {
    res.clearCookie('t')
    return res.status(200).json({
        message: 'Signed out'
    })
}
exports.requirelogin = jwt({
    secret: process.env.JWT_SECRET,
    algorithms: ["HS256"],
    userProperty: 'auth'
})
exports.hasAuthorization = async (req, res, next) => {
    const authorized = req.profile && req.auth && req.profile._id ==req.profile._id
    if(!(authorized)){
        return res.status(403).json({
            error: 'User is not authorized'
        })
    } 
    next()
}