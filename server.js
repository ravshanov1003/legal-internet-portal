const cors = require('cors')
const express = require('express')

const { connectDb } = require('./services/db/db')
const { menuRouter } = require('./src/routes/menu.route')
const { userRouter } = require('./src/routes/user.route')
const { newsRouter } = require('./src/routes/news.route')
const { fileRouter } = require('./src/routes/files.route')
const { bookRouter } = require('./src/routes/books.route')
const { adminRouter } = require('./src/routes/admin.route')
const { sitesRouter } = require('./src/routes/sites.route')
const { phoneRouter } = require('./src/routes/phones.route')
const { videoRouter } = require('./src/routes/videos.route')
const { courseRouter } = require('./src/routes/course.route')
const { problemRouter } = require('./src/routes/problem.route')
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
app.use('/api/menu', menuRouter)
app.use('/api/home', homeRouter)

app.use('/api/course', courseRouter)
app.use('/api/technical-school', technicalSchoolRouter)
app.use('/api/technical-school-faculty', technicalSchoolFacultyRouter)

app.use('/api/problem', problemRouter)
app.use('/api/problem-faq', problemFAQ_Router)
app.use('/api/problem-theme', problemThemeRouter)

app.use('/api/quiz-question', quizQuestionRouter)

app.use('/api/cron', cronRouter)

app.use((error, req, res, next) => {
    console.log(error)
    res.status(500).json({
        success: false,
        error: error.message
    })
    next()
})

app.listen(PORT, connectDb)