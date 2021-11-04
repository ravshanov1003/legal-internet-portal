const mongoose = require('mongoose')

const VisitSchema = new mongoose.Schema({
    login: { type: String, required: true },
    ip: { type: String, required: true },
    region: { type: String, required: true }
}, { timestamps: true })

module.exports = mongoose.model('Visit', VisitSchema)