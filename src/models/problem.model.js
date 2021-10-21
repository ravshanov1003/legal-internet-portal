const { model, Schema } = require('mongoose')

const schema = new Schema({
    title: {
        required: true,
        type: String,
        trim: true
    },
    image: {
        _id: { type: String },
        path: { type: String }
    },
    theme: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'ProblemTheme'
    },
    lang: { type: String, required: true, enum: ['uz', 'ru', 'cy'] },
    article: {
        required: true,
        type: String,
        trim: true
    },
    links: [{
        title: {
            required: true,
            type: String,
            trim: true
        },
        link: {
            required: true,
            type: String
        }
    }],
    views: {
        type: Number,
        default: 0
    },
    documents: [{
        title: {
            required: true,
            type: String,
            trim: true
        },
        link: {
            required: true,
            type: String
        }
    }],
    tags: [String],
    helpful: {
        type: Number,
        default: 0
    },
    notHelpful: {
        type: Number,
        default: 0
    },
}, { timestamps: true, collection: 'problems' })

module.exports = { ProblemModel: model('Problem', schema) }