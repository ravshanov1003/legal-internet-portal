const router = require('express').Router()

const { cache } = require('../middlewares/cashe.middleware')
const { protect, checkPermission } = require('../middlewares/auth.middleware')
const { getUsers, getUser, updateUser, deleteUser, users } = require('../controllers/admin.controllers')

//router.get('/users', cache('users'), users)
router.get('/all', cache('users'), getUsers)
router.get('/get/:id', [protect, checkPermission('admin')], getUser)
router.put("/update/:id", [protect, checkPermission('admin')], updateUser)
router.delete('/delete/:id', [protect, checkPermission('admin')], deleteUser)

module.exports = { adminRouter: router }