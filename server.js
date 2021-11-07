const cors = require('cors')
const express = require('express')
const { instrument } = require('@socket.io/admin-ui')
const io = require('socket.io')(3000, {
    cors: {
        origin: ["http://localhost:8080", "https://admin.socket.io"]
    }
})

const { connectDb } = require('./services/db/db')
const { menuRouter } = require('./src/routes/menu.route')
const { userRouter } = require('./src/routes/user.route')
const { newsRouter } = require('./src/routes/news.route')
const { fileRouter } = require('./src/routes/files.route')
const { bookRouter } = require('./src/routes/books.route')
const { visitRouter } = require('./src/routes/visit.route')
const { adminRouter } = require('./src/routes/admin.route')
const { sitesRouter } = require('./src/routes/sites.route')
const { phoneRouter } = require('./src/routes/phones.route')
const { videoRouter } = require('./src/routes/videos.route')
const { courseRouter } = require('./src/routes/course.route')
const { problemRouter } = require('./src/routes/problem.route')
const { quizThemeRouter } = require('./src/routes/quizTheme.route')
const { testResultRouter } = require('./src/routes/testResult.route')
const { problemFAQ_Router } = require('./src/routes/problemFAQ.route')
const { problemThemeRouter } = require('./src/routes/problemTheme.route')
const { booksCatalogRouter } = require('./src/routes/booksCatalog.route')
const { quizQuestionRouter } = require('./src/routes/quizQuestion.route')
const { legalGlossaryRouter } = require('./src/routes/legalGlossary.route')
const { phonesCatalogRouter } = require('./src/routes/phonesCatalog.route.js')
const { technicalSchoolRouter } = require('./src/routes/technicalSchool.route')
const { technicalSchoolFacultyRouter } = require('./src/routes/technicalSchoolFaculty.route')

const { cronRouter, CronJob } = require('./src/utils/cron')
const { homeRouter } = require('./src/routes/home.route')

const app = express()
require('dotenv').config()

const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
CronJob()


app.use('/api/admin', adminRouter)
app.use('/api/user', userRouter)
app.use('/api/file', fileRouter)
app.use('/api/news', newsRouter)
app.use('/api/books-catalog', booksCatalogRouter)
app.use('/api/library', bookRouter)
app.use('/api/phones-catalog', phonesCatalogRouter)
app.use('/api/helpline', phoneRouter)
app.use('/api/legal-glossary', legalGlossaryRouter)
app.use('/api/sites', sitesRouter)
app.use('/api/video', videoRouter)

app.use('/api/course', courseRouter)
app.use('/api/technical-school', technicalSchoolRouter)
app.use('/api/technical-school-faculty', technicalSchoolFacultyRouter)

app.use('/api/problem', problemRouter)
app.use('/api/problem-faq', problemFAQ_Router)
app.use('/api/problem-theme', problemThemeRouter)

app.use('/api/quiz-theme', quizThemeRouter)
app.use('/api/quiz-question', quizQuestionRouter)
app.use('/api/test-result', testResultRouter)

app.use('/api/menu', menuRouter)
app.use('/api/home', homeRouter)
app.use('/api/visit', visitRouter)

app.use('/api/cron', cronRouter)

io.on('connection', socket => {
    console.log(socket.id)
    socket.on('send-message', (message, room) => {
        if (room === '') {
            socket.broadcast.emit('receive-message', message)
        } else {
            socket.to(room).emit('receive-message', message)
        }
    })
    socket.on('join-room', (room, cb) => {
        socket.join(room)
        cb(`Joined ${room}`)
    })
})

const userIo = io.of('/user')
userIo.on('connection', socket => {
    //console.log("connected to user namespace " + socket.username)
})

userIo.use((socket, next) => {
    if (socket.handshake.auth.token) {
        socket.username = getUsernameFromToken(socket.handshake.auth.token)
        next()
    } else {
        next(new Error("please send token "))
    }
})

function getUsernameFromToken(token) {
    return token
}

instrument(io, { auth: false })

app.use((error, req, res, next) => {
    console.log(error)
    res.status(500).json({
        success: false,
        error: error.message
    })
    next()
})

app.listen(PORT, connectDb)