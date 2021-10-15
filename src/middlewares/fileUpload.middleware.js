const path = require("path");
const multer = require('multer');

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'files')
    },
    filename(req, file, cb) {
        const ext = path.extname(file.originalname);
        cb(null, file.fieldname + "-" + Date.now() + ext);
    }
})

module.exports = multer({
    storage,
    limits: {
        fileSize: 30 * 1024 * 1024
    }
})