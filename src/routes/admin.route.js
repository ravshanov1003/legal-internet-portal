const router = require('express').Router()

const auth = require('../middlewares/auth.middleware')
const admin = require('../controllers/admin.controllers')
const { cache } = require('../middlewares/cache.middleware')

//router.get('/users', cache('users'), users)
router.get('/all', cache('users'), admin.getUsers)
router.get('/get/:id', [auth.protect, auth.checkPermission('admin')], admin.getUser)
router.put("/update/:id", [auth.protect, auth.checkPermission('admin')], admin.updateUser)
router.delete('/delete/:id', [auth.protect, auth.checkPermission('admin')], admin.deleteUser)

module.exports = { adminRouter: router }