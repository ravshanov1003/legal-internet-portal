const cors = require('cors')
const express = require('express')

const { connectDb } = require('./db/db')
const { userRouter } = require('./src/routes/user.route')
const { newsRouter } = require('./src/routes/news.route')
const { bookRouter } = require('./src/routes/books.route')
const { adminRouter } = require('./src/routes/admin.route')
const { booksCatalogRouter } = require('./src/routes/booksCatalog.route')
const { phonesCatalogRouter } = require('./src/routes/phonesCatalog.route.js')

const app = express()
require('dotenv').config()

const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(cors())

app.use('/api/user', userRouter)
app.use('/api/admin', adminRouter)
app.use('/api/news', newsRouter)
app.use('/api/books-catalog', booksCatalogRouter)
app.use('/api/library', bookRouter)
app.use('/api/phones-catalog', phonesCatalogRouter)

app.use((error, req, res, next) => {
    res.status(500).json({
        success: false,
        error: error.message
    })
    next()
})

app.listen(PORT, connectDb)