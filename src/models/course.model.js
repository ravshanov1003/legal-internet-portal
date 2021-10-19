const { model, Schema } = require('mongoose')

const schema = new Schema({
    title: {

        required: true,
        type: String,
        trim: true
    },
    image: {
        required: true,
        type: String
    },
    link: {
        required: true,
        type: String,
        trim: true
    },
    time: {

        required: true,
        type: String,
        trim: true
    },
    rating: {
        required: true,
        type: Number,
        min: 0,
        max: 5
    },
    lang: { type: String, required: true, enum: ['uz', 'ru', 'cy'] }
}, { timestamps: true, collection: 'lessons' })

module.exports = { LessonModel: model('Lesson', schema) }