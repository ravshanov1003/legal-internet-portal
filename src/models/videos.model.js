const { model, Schema } = require('mongoose')

const schema = new Schema({
    title: {
        required: true,
        type: String,
        trim: true
    },
    lang: { type: String, required: true, enum: ['uz', 'ru', 'cy'] },
    link: {
        required: true,
        type: String,
        trim: true
    }
}, { timestamps: true, collection: 'videos' })

module.exports = { VideoModel: model('Video', schema) }