const { Schema, model } = require('mongoose')

const schema = new Schema({
    path: {
        required: true,
        type: String
    }
}, { timestamps: true, collection: 'files' })

module.exports = { FileModel: model('File', schema) }