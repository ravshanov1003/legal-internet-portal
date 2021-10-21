const { model, Schema } = require('mongoose')

const schema = new Schema({
    question: {
        required: true,
        type: String,
        trim: true
    },
    lang: { type: String, required: true, enum: ['uz', 'ru', 'cy'] },
    answer: {
        required: true,
        type: String,
        trim: true
    },
    catalog: {
        required: true,
        type: Number,
        min: 1,
        max: 18
    }
}, { timestamps: true, collection: 'problem-faqs' })

module.exports = { ProblemFAQ_Model: model('ProblemFAQ', schema) }