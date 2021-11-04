const mongoose = require('mongoose')

const TestResult = new mongoose.Schema({
    theme: { type: mongoose.Schema.Types.ObjectId, ref: 'quiz-themes', required: true },
    result: { type: Number, required: true },
    length: { type: Number, required: true },
    success: { type: Number, required: true },
    wrong: { type: Number, required: true },
    tests: [Number]
}, { timestamps: true })

module.exports = mongoose.model('TestResult', TestResult)