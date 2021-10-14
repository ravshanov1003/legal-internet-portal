const { model, Schema } = require('mongoose')

const schema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    link: {
        required: true,
        type: String,
        trim: true,
        lowercase: true
    },
    image: {
        _id: { type: String, required: true },
        path: { type: String, required: true }
    }
}, { timestamps: true, collection: 'sites' })

module.exports = { SiteModel: model('Site', schema) }