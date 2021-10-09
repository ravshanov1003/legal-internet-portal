const express = require('express')
const mongoose = require('mongoose')

const { connectDb } = require('./db/db')
const { userRouter } = require('./src/routes/user.route')

const app = express()
require('dotenv').config()

const PORT = process.env.PORT || 3000

app.use(express.json())

app.use('/api/user', userRouter)

app.listen(PORT, connectDb)