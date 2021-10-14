const router = require('express').Router()

const { protect, checkPermission } = require('../middlewares/auth.middleware')
const { getUsers, getUser, updateUser, deleteUser } = require('../controllers/admin.controllers')

router.get('/get/:id', [protect, checkPermission('admin')], getUser)
router.get('/all', [protect, checkPermission('admin')], getUsers)
router.put("/update/:id", [protect, checkPermission('admin')], updateUser)
router.delete('/delete/:id', [protect, checkPermission('admin')], deleteUser)

module.exports = { adminRouter: router }