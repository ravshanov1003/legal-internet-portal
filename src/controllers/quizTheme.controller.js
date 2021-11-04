const fs = require('fs')
const path = require('path')
const QuizQuestion = require('../models/quizQuestion.model')
const QuizTheme = require('../models/quizTheme.model')

exports.admin = async(req, res) => {
    await QuizTheme.find()
        .sort({ createdAt: -1 })
        .select({ article: 0, image: 0, tags: 0 })
        .exec((err, data) => {
            if (err) return res.status(400).json({ success: false, message: err.message })
            return res.status(200).json({ success: true, data })
        })
}

exports.getByCatalog = async(req, res) => {
    const { tag, page, limit } = req.query
    const PAGE_SIZE = parseInt(limit) || 10
    const skip = (parseInt(page) - 1) * PAGE_SIZE || 0
    const catalog = parseInt(req.params.catalog)
    try {
        const data = await QuizTheme
            .find({ $and: [{ lang: req.params.lang }, { catalog: catalog }] })
            .sort('-createdAt')
            .skip(skip)
            .limit(PAGE_SIZE)
        res.status(200).json({ success: true, data })
    } catch (error) {
        res.status(404).json({ success: false, error })
    }
}

exports.getById = async(req, res) => {
    await QuizTheme.findByIdAndUpdate(req.params.id, { $inc: { views: 1 } })
        .exec((error, data) => {
            if (error) return res.status(400).json({ success: false, message: error.message })
            if (!data)
                return res.status(404).json({ success: false, error: "not found" })
            res.status(200).json({ success: true, data })
        })
}

exports.add = async(req, res) => {
    let data = new QuizTheme(req.body)
    try {
        await data.save()
        res.status(200).json({ success: true })
    } catch (error) {
        return res.status(400).json({ success: false, message: error.message })
    }
}

exports.updateById = async(req, res) => {
    await QuizTheme.updateOne({ _id: req.params.id }, { $set: req.body }, { new: true }, (err, data) => {
        if (err) return res.status(400).json({ success: false, message: err.message })
        return res.status(200).json({ success: true, data })
    })
}

exports.deleteById = async(req, res) => {
    try {
        // 1. Mavzuni topib olamiz
        let theme = await QuizTheme.findById(req.params.id, 'image')
        if (!theme) return res.status(404).json({ success: false, error: "not found" })

        // 2. Mavzuga oid barcha savollarni topib olamiz
        let questions = await QuizQuestion.find({ theme: req.params.id }, '_id')

        if (questions && questions.length > 0) {
            // 3. Har bir savolga tegishli javoblarni o'chiramiz
            for (const question of questions)
            // 4. Mavzuga oid barcha savollarni o'chiramiz
                await QuizQuestion.deleteMany({ theme: req.params.id })
        }

        // 5. Mavzuga oid rasmni o'chiramiz
        if (theme.image)
            fs.unlink(path.join(__dirname, `/../${theme.image}`), error => { message: error.message })

        // 6. Mavzuni o'zini o'chiramiz
        await QuizTheme.findByIdAndDelete(req.params.id)
        res.status(200).json({ success: true })
    } catch (error) {
        res.status(400).json({ success: false, message: error.message })
    }
}