const router = require('express').Router()

const auth = require('../middlewares/auth.middleware')
const book = require('../controllers/books.controller')

router.post('/add', auth.protect, auth.checkPermission('admin'), book.add)
router.get('/all', book.getAll)
router.get('/get/:id', book.getById)
router.delete('/delete/:id', auth.protect, auth.checkPermission('admin'), book.deleteById)
router.put('/update/:id', auth.protect, auth.checkPermission('admin'), book.updateById)
router.get('/top', book.getTop)
router.get('/get/:text', book.search)
router.get('/admin', auth.protect, auth.checkPermission('admin'), book.admin)
router.get('/home', book.home)

module.exports = { bookRouter: router }