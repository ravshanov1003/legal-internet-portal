const router = require('express').Router()

const auth = require('../middlewares/auth.middleware')
const book = require('../controllers/books.controller')

router.post('/add', auth.protect, auth.checkPermission('admin'), book.add)
router.get('/all', book.getAll)
router.get('/:id', book.getById)
router.delete('/delete/:id', auth.protect, auth.checkPermission('admin'), book.deleteById)
router.put('/update/:id', auth.protect, auth.checkPermission('admin'), book.updateById)

module.exports = { bookRouter: router }