const router = require('express').Router()

const auth = require('../middlewares/auth.middleware')
const problemTheme = require('../controllers/problemTheme.controller')

router.get('/all', problemTheme.all)
router.get('/home', problemTheme.home)
router.get('/search', problemTheme.search)
router.get('/faq/:id', problemTheme.getQuestion4Problem)

router.post('/add', auth.protect, auth.checkPermission('admin'), problemTheme.add)
router.put('/update/:id', auth.protect, auth.checkPermission('admin'), problemTheme.updateById)
router.delete('/delete/:id', auth.protect, auth.checkPermission('admin'), problemTheme.deleteById)

module.exports = { problemThemeRouter: router }