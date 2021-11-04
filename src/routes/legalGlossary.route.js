const router = require('express').Router()

const auth = require('../middlewares/auth.middleware')
const glossary = require('../controllers/legalGlossary.controller')

router.get('/admin', glossary.admin)
router.get('/all', glossary.getAll)
router.get('/filter', glossary.filterByChar)
router.get('/:id', glossary.getById)
router.post('/add', [auth.protect, auth.checkPermission('admin')], glossary.add)
router.delete('/delete/:id', [auth.protect, auth.checkPermission('admin')], glossary.deleteById)
router.put('/update/:id', [auth.protect, auth.checkPermission('admin')], glossary.updateById)

module.exports = { legalGlossaryRouter: router }