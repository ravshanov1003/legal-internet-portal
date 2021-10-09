const router = require('express').Router()

const { getUsers, getUser } = require('../controllers/admin.controllers')

router.get('/all', getUsers)
router.get('/:id', getUser)

module.exports = { adminRouter: router }