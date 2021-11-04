const router = require('express').Router()

const auth = require('../middlewares/auth.middleware')
const controller = require('../controllers/quizTheme.controller')


router.get('/admin', controller.admin)
router.get('/:id', controller.getById)
router.get('/all/:lang/:catalog', controller.getByCatalog)
router.post('/add', [auth.protect, auth.checkPermission('admin')], controller.add)
router.put('/update/:id', [auth.protect, auth.checkPermission('admin')], controller.updateById)
router.delete('/delete/:id', [auth.protect, auth.checkPermission('admin')], controller.deleteById)


module.exports = { quizThemeRouter: router }