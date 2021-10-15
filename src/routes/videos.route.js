const router = require('express').Router()

const auth = require('../middlewares/auth.middleware')
const video = require('../controllers/videos.controller')

router.get('/all', video.all)
router.post('/add', auth.protect, auth.checkPermission('admin'), video.add)
router.put('/update/:id', auth.protect, auth.checkPermission('admin'), video.updateById)
router.delete('/delete/:id', auth.protect, auth.checkPermission('admin'), video.deleteById)

module.exports = { videoRouter: router }