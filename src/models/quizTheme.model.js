const { model, Schema } = require('mongoose')

const schema = new Schema({
    title: {
        type: String,
        trim: true,
        required: true
    },
    article: {
        type: String,
        trim: true,
        required: true

    },
    lang: { type: String, required: true, enum: ['uz', 'ru', 'cy'] },
    catalog: {
        required: true,
        type: Number,
        min: 1,
        max: 4
    },
    image: {
        required: true,
        type: String
    },
    views: {
        type: Number,
        default: 0
    },
    tags: [String]
}, { timestamps: true, collection: 'quiz-themes' })

schema.pre('remove', async(next) => {
    this.model('QuizQuestion').deleteMany({ theme: this._id });
    this.model('TestResult').deleteMany({ theme: this._id });
    next();
})

module.exports = model('QuizTheme', schema)