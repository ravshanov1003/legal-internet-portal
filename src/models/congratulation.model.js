const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    text: { type: String, required: true },
}, { timestamps: true })

module.exports = mongoose.model('Congratulation', schema)