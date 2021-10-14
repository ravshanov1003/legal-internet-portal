const router = require('express').Router()

const auth = require('../middlewares/auth.middleware')
const phone = require('../controllers/phones.controllers')

router.get('/all', phone.getAll)
router.get('/search', phone.search)
router.post('/add', auth.protect, auth.checkPermission('admin'), phone.add)
router.put('/update/:id', auth.protect, auth.checkPermission('admin'), phone.updateById)
router.delete('/delete/:id', auth.protect, auth.checkPermission('admin'), phone.deleteById)

module.exports = { phoneRouter: router }