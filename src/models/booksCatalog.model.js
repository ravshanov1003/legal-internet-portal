const { model, Schema, Types } = require('mongoose')

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
}, { timestamps: true, collection: 'books-catalog' })

schema.pre('remove', async(next) => {
    await this.model('books').deleteMany({ catalog: this._id });
    next();
})

module.exports = { BooksCatalogModel: model('BooksCatalog', schema) }