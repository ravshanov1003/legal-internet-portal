const { Schema, model, Types } = require('mongoose')
const schema = new Schema({
    name: {
        uz: { type: String, required: true },
        ru: { type: String, required: true },
        cy: { type: String, required: true },
    },
    image: { type: String, required: true },
    num: { type: Number, required: true }
}, { timestamps: true, collection: 'news' })

module.exports = { MenuModel: model('Menu', schema) }