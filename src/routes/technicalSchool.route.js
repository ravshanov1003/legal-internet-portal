const router = require('express').Router()

const auth = require('../middlewares/auth.middleware')
const school = require('../controllers/technicalSchool.controller')

router.get('/all', school.all)
router.post('/add', school.add)

module.exports = { technicalSchoolRouter: router }