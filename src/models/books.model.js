const { model, Schema } = require('mongoose')

const schema = new Schema({
    title: {
        type: String,
        trim: true,
        required: true
    },
    description: {
        type: String,
        trim: true,
        required: true
    },
    author: { type: String, required: true },
    organization: { type: String, required: true },
    lang: { type: String, required: true, enum: ['uz', 'ru', 'cy'] },
    year: {
        type: Number,
        required: true
    },
    catalog: {
        type: Schema.Types.ObjectId,
        ref: 'BooksCatalog',
        required: true
    },
    file: {
        type: String,
        trim: true,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    tags: [String],
    view: {
        type: Number,
        default: 0
    },
    downloads: {
        type: Number,
        default: 0
    },
    slug: { type: String, unique: true, required: true }
}, { timestamps: true, collection: 'books' })

module.exports = { BooksModel: model('Books', schema) }