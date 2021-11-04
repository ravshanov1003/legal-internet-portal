const multer = require('multer');
const path = require('path')


const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, './public/images')
    },
    filename(req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

module.exports = multer({
    storage,
    fileFilter(req, file, cb) {
        if (file.mimetype.startsWith('image'))
            cb(null, true)
        else
            cb(null, false)
    }
})