const { model, Schema } = require('mongoose')

const schema = new Schema({
    question: {
        required: true,
        type: String,
        trim: true
    },
    position: { type: Number, default: 0 },
    lang: { type: String, required: true, enum: ['uz', 'ru', 'cy'] },
    answer: [{
        answer: {
            required: true,
            type: String,
            trim: true
        },
        isTrue: {
            type: Boolean,
            default: false
        },
    }],
    theme: {
        type: Schema.Types.ObjectId,
        ref: 'QuizTheme',
        required: true
    }
}, { timestamps: true, collection: 'quiz-questions' })
schema.pre('remove', async(next) => {
    this.model('QuizAnswer').deleteMany({ question: this._id });
    next();
})
module.exports = model('QuizQuestion', schema)