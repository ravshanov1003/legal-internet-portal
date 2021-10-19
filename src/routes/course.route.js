const router = require('express').Router()

const auth = require('../middlewares/auth.middleware')
const lesson = require('../controllers/course.controller')

router.get('/all', lesson.all)
router.get('/home', lesson.home)
router.get('/lesson/:id', lesson.getById)
router.post('/add', auth.protect, auth.checkPermission('admin'), lesson.add)
router.put('/update/:id', auth.protect, auth.checkPermission('admin'), lesson.updateById)
router.delete('/delete/:id', auth.protect, auth.checkPermission('admin'), lesson.deleteById)

module.exports = { courseRouter: router }