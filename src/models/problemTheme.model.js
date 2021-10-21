const { model, Schema } = require('mongoose')

const schema = new Schema({
    name: {
        required: true,
        type: String,
        trim: true
    },
    lang: { type: String, required: true, enum: ['uz', 'ru', 'cy'] },
    catalog: {
        required: true,
        type: Number,
        min: 1,
        max: 18
    }
}, { timestamps: true, collection: 'problem-themes' })

schema.pre('remove', async(next) => {
    await this.model('problems').deleteMany({ theme: this._id });
    await this.model('problem-faqs').deleteMany({ theme: this._id });
    next();
})

module.exports = { ProblemThemeModel: model('ProblemTheme', schema) }