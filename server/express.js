const express = require('express')
const cookieParser = require('cookie-parser')
const helmet = require('helmet')
require('dotenv').config()
const cors = require('cors')

const userRoutes = require('./routes/user.routes')
const authRoutes = require('./routes/auth.routes')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(cookieParser())
app.use(helmet())

app.use('/users', userRoutes)
app.use('/auth', authRoutes)

module.exports = app