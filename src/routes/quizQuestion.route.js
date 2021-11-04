const router = require('express').Router()
const auth = require('../middlewares/auth.middleware')
const controller = require('../controllers/quizQuestion.controller')


router.get('/all/:id', controller.getTheme)
router.get('/:id', controller.getById)
router.post('/add', [auth.protect, auth.checkPermission('admin')], controller.add)
router.delete('/delete/:id', [auth.protect, auth.checkPermission('admin')], controller.deleteById)
router.put('/update/:id', [auth.protect, auth.checkPermission('admin')], controller.updateById)


module.exports = { quizQuestionRouter: router }