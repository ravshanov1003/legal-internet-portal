const QuizQuestion = require('../models/quizQuestion.model')

exports.getTheme = async(req, res) => {
    try {
        await QuizQuestion.find({ theme: req.params.id })
            .sort({ position: 1 })
            .exec((err, data) => {
                if (err) return res.status(400).json({ success: false, message: err.message })
                return res.status(200).json({ success: true, data })
            })
    } catch (err) {
        res.status(400).json({ success: false, message: err.message })
    }
}
exports.getById = async(req, res) => {
    try {
        await QuizQuestion.findOne({ _id: req.params.id }, (err, data) => {
            if (err) return res.status(400).json({ success: false, message: err.message })
            return res.status(200).json({ success: true, data })
        })
    } catch (err) {
        res.status(400).json({ success: false, message: err.message })
    }
}

exports.add = async(req, res) => {
    try {
        const quiz = QuizQuestion.insertMany(req.body)
        await quiz.save()
        res.status(200).json({ success: true, quiz })
    } catch (err) {
        res.status(400).json({ success: false, message: err.message })
    }
}

exports.updateById = async(req, res) => {
    try {
        await QuizQuestion.updateOne({ _id: req.params.id }, { $set: req.body }, { new: true }, (err, data) => {
            if (err) return res.status(400).json({ success: false, message: err.message })
            return res.status(200).json({ success: true })
        })
    } catch (err) {
        res.status(400).json({ success: false, message: err.message })
    }
}

exports.deleteById = async(req, res) => {
    try {
        await QuizQuestion.deleteOne({ _id: req.params.id }, (err, data) => {
            if (err) return res.status(400).json({ success: false, message: err.message })
            return res.status(200).json({ success: true })
        })
    } catch (err) {
        res.status(400).json({ success: false, message: err.message })
    }
}