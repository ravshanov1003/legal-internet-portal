const router = require('express').Router()

const auth = require('../middlewares/auth.middleware')
const site = require('../controllers/sites.controller')

router.get('/all', site.getAll)
router.post('/add', auth.protect, auth.checkPermission('admin'), site.add)
router.put('/update/:id', auth.protect, auth.checkPermission('admin'), site.updateById)
router.delete('/delete/:id', auth.protect, auth.checkPermission('admin'), site.deleteById)

module.exports = { sitesRouter: router }