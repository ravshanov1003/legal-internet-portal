const { model, Schema } = require('mongoose')

const schema = new Schema({
    title: {
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
    catalog: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'PhonesCatalog'
    },
    position: { type: Number, required: true },
    number: {
        required: true,
        type: Number
    }
}, { timestamps: true, collection: 'phones' })

module.exports = { PhoneModel: model('Phone', schema) }