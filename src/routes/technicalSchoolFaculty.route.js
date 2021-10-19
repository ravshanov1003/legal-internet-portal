const router = require('express').Router()

const auth = require('../middlewares/auth.middleware')
const tsf = require('../controllers/technicalSchoolFaculty.controller')
    // tsf = technical School Faculty

router.get('/all', tsf.all)
router.get('/faculty/:id', tsf.getById)
router.post('/add', auth.protect, auth.checkPermission('admin'), tsf.add)
router.put('/update/:id', auth.protect, auth.checkPermission('admin'), tsf.updateById)
router.delete('/delete/:id', auth.protect, auth.checkPermission('admin'), tsf.deleteById)

module.exports = { technicalSchoolFacultyRouter: router }