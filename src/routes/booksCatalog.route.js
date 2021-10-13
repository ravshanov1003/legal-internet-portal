const router = require('express').Router()

const auth = require('../middlewares/auth.middleware')
const booksCatalog = require('../controllers/booksCatalog.controller')

router.get('/all', booksCatalog.getAll)
router.post('/add', auth.protect, auth.checkPermission('admin'), booksCatalog.add)
router.put('/update/:id', auth.protect, auth.checkPermission('admin'), booksCatalog.updateById)
router.delete('/delete/:id', auth.protect, auth.checkPermission('admin'), booksCatalog.deleteById)

module.exports = { booksCatalogRouter: router }