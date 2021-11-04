const router = require('express').Router()

const controller = require('../controllers/testResult.controller')

router.get('/all', controller.get)
router.post('/add', controller.add)
router.get('/:id', controller.getId)

module.exports = { testResultRouter: router };