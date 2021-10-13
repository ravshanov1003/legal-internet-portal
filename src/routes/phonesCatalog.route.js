const router = require('express').Router()

const auth = require('../middlewares/auth.middleware')
const phoneC = require('../controllers/phonesCatalog.controller')

router.get('/all', phoneC.getAll)
router.post('/add', auth.protect, auth.checkPermission('admin'), phoneC.add)
router.put('/update/:id', auth.protect, auth.checkPermission('admin'), phoneC.updateById)
router.delete('/delete/:id', auth.protect, auth.checkPermission('admin'), phoneC.deleteById)

module.exports = { phonesCatalogRouter: router }