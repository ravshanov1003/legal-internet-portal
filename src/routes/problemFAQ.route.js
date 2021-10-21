const router = require('express').Router()

const auth = require('../middlewares/auth.middleware')
const problemFAQ = require('../controllers/problemFAQ.controller')

router.get('/all', problemFAQ.all)
router.get('/:id', problemFAQ.getById)
router.post('/add', auth.protect, auth.checkPermission('admin'), problemFAQ.add)
router.put('/update/:id', auth.protect, auth.checkPermission('admin'), problemFAQ.updateById)
router.delete('/delete/:id', auth.protect, auth.checkPermission('admin'), problemFAQ.deleteById)

module.exports = { problemFAQ_Router: router }