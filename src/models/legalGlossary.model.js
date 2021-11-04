const { model, Schema } = require('mongoose')

const schema = new Schema({
    term: {
        type: String,
        trim: true,
        required: true
    },
    description: {
        type: String,
        trim: true,
        required: true
    },
    views: { type: Number, default: 0 },
    lang: { type: String, required: true, enum: ['uz', 'ru', 'cy'] },
}, { timestamps: true, collection: 'dictionary2' })


module.exports = model('LegalGlossary', schema)