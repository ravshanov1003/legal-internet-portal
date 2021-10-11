const express = require('express')

const { connectDb } = require('./db/db')
const { userRouter } = require('./src/routes/user.route')
const { newsRouter } = require('./src/routes/news.route')
const { adminRouter } = require('./src/routes/admin.route')

const app = express()
require('dotenv').config()

const PORT = process.env.PORT || 3000

app.use(express.json())

app.use('/api/user', userRouter)
app.use('/api/admin', adminRouter)
app.use('/api/news', newsRouter)

app.listen(PORT, connectDb)