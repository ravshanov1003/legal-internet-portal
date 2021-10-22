const router = require('express').Router()

const auth = require('../middlewares/auth.middleware')
const problem = require('../controllers/problem.controller')

router.get('/all', problem.all)

router.get('/:id', problem.getById)
router.get('/problem/:id', problem.getByTheme)
router.get('/:id/helpful/:id', problem.helpful)

router.post('/add', auth.protect, auth.checkPermission('admin'), problem.add)
router.put('/update/:id', auth.protect, auth.checkPermission('admin'), problem.updateById)
router.delete('/delete/:id', auth.protect, auth.checkPermission('admin'), problem.deleteById)

module.exports = { problemRouter: router }