const router = require('express').Router()

const controller = require('../controllers/visit.controller')

router.get('/all', controller.get)
router.post('/add', controller.create)

module.exports = { visitRouter: router }