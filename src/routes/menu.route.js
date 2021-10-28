const router = require('express').Router()

const auth = require('../middlewares/auth.middleware')
const menu = require('../controllers/menu.controller')

//router.get('/:id', menu.id)
router.get('/all', menu.all)
router.post('/add', auth.protect, auth.checkPermission('admin'), menu.add)
router.put('/update/:id', auth.protect, auth.checkPermission('admin'), menu.update)
router.delete('/delete/:id', auth.protect, auth.checkPermission('admin'), menu.delete)

module.exports = { menuRouter: router }