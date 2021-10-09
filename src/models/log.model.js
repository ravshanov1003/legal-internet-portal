const mongoose = require('mongoose')

const LogSchema = new mongoose.Schema({
    user: { type: String, required: true },
    action: { type: Number, enum: [1, 2, 3], required: true }, // 1-add 2-edit 3-delete
    category: { type: String, required: true },
    product: { type: String, required: true }
}, { timestamps: true })

module.exports = mongoose.model('Log', LogSchema)