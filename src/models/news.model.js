const { Schema, model } = require('mongoose')

const schema = new Schema({
    title: {
        required: true,
        type: String,
        trim: true
    },
    article: {
        required: true,
        type: String,
        trim: true
    },
    image: {
        type: String
    },
    views: {
        type: Number,
        default: 0
    },
    lang: {
        type: String,
        enum: ['uz', 'ru', 'cy'],
        required: true
    },
    tags: [String]
}, { timestamps: true, collection: 'news' })


module.exports = model('News', schema)