const router = require('express').Router()

const file = require('../controllers/files.controller')
const upload = require('../middlewares/fileUpload.middleware')

router.get('/all', file.getAll)
router.post('/upload', upload.single('file'), file.upload)
router.delete('/delete/:id', file.delete)

module.exports = { fileRouter: router }