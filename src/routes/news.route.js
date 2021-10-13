const router = require('express').Router()

const news = require('../controllers/news.controller')
const { protect, checkPermission } = require('../middlewares/auth.middleware')

router.get('/all', news.getAll)
router.get('/get/:id', news.getById)
router.get('/get-home', news.home)
router.get('/home/:lang/:id', news.getHome)
router.post('/add', protect, checkPermission('admin'), news.add)
router.delete('/delete/:id', protect, checkPermission('admin'), news.deleteById)
router.put('/update/:id', protect, checkPermission('admin'), news.updateById)
    //router.get('/admin', protect, checkPermission('admin'), news.admin)

module.exports = { newsRouter: router }