const cors = require('cors')
const express = require('express')

const { connectDb } = require('./db/db')
const { userRouter } = require('./src/routes/user.route')
const { newsRouter } = require('./src/routes/news.route')
const { fileRouter } = require('./src/routes/files.route')
const { bookRouter } = require('./src/routes/books.route')
const { adminRouter } = require('./src/routes/admin.route')
const { sitesRouter } = require('./src/routes/sites.route')
const { phoneRouter } = require('./src/routes/phones.route')
const { videoRouter } = require('./src/routes/videos.route')
const { booksCatalogRouter } = require('./src/routes/booksCatalog.route')
const { phonesCatalogRouter } = require('./src/routes/phonesCatalog.route.js')

const crud = require('./src/controllers/crud.controller')

const app = express()
require('dotenv').config()

const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//app.use('/api', crud)
app.use('/api/user', userRouter)
app.use('/api/file', fileRouter)
app.use('/api/admin', adminRouter)
app.use('/api/news', newsRouter)
app.use('/api/books-catalog', booksCatalogRouter)
app.use('/api/library', bookRouter)
app.use('/api/phones-catalog', phonesCatalogRouter)
app.use('/api/helpline', phoneRouter)
app.use('/api/sites', sitesRouter)
app.use('/api/video', videoRouter)

app.use((error, req, res, next) => {
    console.log(error)
    res.status(500).json({
        success: false,
        error: error.message
    })
    next()
})

app.listen(PORT, connectDb)