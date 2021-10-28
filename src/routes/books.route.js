const router = require('express').Router()

const auth = require('../middlewares/auth.middleware')
const book = require('../controllers/books.controller')
const { cache } = require('../middlewares/cashe.middleware')

router.get('/home', book.home)
router.get('/all', cache('books'), book.getAll)
router.get('/top', book.getTop)
router.get('/get/:id', book.getById)
router.get('/search', book.search)
router.post('/add', auth.protect, auth.checkPermission('admin'), book.add)
router.get('/admin', auth.protect, auth.checkPermission('admin'), book.admin)
router.put('/update/:id', auth.protect, auth.checkPermission('admin'), book.updateById)
router.delete('/delete/:id', auth.protect, auth.checkPermission('admin'), book.deleteById)

module.exports = { bookRouter: router }