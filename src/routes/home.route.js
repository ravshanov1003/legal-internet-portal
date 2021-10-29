const router = require('express').Router()

const home = require('../controllers/home.controller')

router.get('/tag', home.tag)
router.get('/site', home.site)
router.get('/video', home.video)
router.get('/course', home.course)
router.get('/search', home.search)
router.get('/library', home.library)
router.get('/news', home.news)
router.get('/dashboard', home.dashboard)

module.exports = { homeRouter: router }