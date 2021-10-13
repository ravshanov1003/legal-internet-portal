const { model, Schema } = require('mongoose')

const schema = new Schema({
    name: {
        uz: {
            required: true,
            type: String,
            trim: true
        },
        ru: {
            required: true,
            type: String,
            trim: true
        },
        cy: {
            required: true,
            type: String,
            trim: true
        }
    },
    position: { type: Number, required: true },
}, { timestamps: true, collection: 'phones-catalog' })

schema.pre('remove', async(next) => {
    await this.model('phones').deleteMany({ catalog: this._id });
    next();
})

module.exports = { PhonesCatalog: model('PhonesCatalog', schema) }