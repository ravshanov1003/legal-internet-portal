const router = require('express').Router()

const { protect, checkPermission } = require('../middlewares/auth.middleware')
const { getUsers, getUser, updateUser, deleteUser } = require('../controllers/admin.controllers')

/**
 * @swagger
 * /api/admin/all:
 *   get:
 *     description: All users
 *     responses:
 *       200:
 *         description: Returns all the users
 */
router.get('/all', getUsers)

/**
 * @swagger
 * /api/admin/get/616a804ecc3636e82aeaab60:
 *   get:
 *     description: All users
 *     responses:
 *       200:
 *         description: Returns all the users
 */
router.get('/get/:id', [protect, checkPermission('admin')], getUser)

/**
 * @swagger
 * /api/admin/update/:id:
 *   put:
 *     description: All users
 *     responses:
 *       200:
 *         description: Returns all the users
 */
router.put("/update/:id", [protect, checkPermission('admin')], updateUser)

/**
 * @swagger
 * /api/admin/delete/id:
 *   delete:
 *     description: All users
 *     responses:
 *       200:
 *         description: Returns all the users
 */
router.delete('/delete/:id', [protect, checkPermission('admin')], deleteUser)

module.exports = { adminRouter: router }