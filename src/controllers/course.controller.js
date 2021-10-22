const { LessonModel } = require('../models/course.model')

async function add(req, res) {
    const data = new LessonModel(req.body)
    try {
        await data.save()
        res.status(201).json({ success: true, message: "Lesson created successfully" })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}

async function all(req, res) {
    try {
        const data = await LessonModel.find()
            .sort('-createdAt')
        res.status(200).json({ success: true, data })
    } catch (error) {
        res.status(400).json({ success: false, message: error.message })
    }
}

async function getById(req, res) {
    const { id } = req.params
    try {
        const data = await LessonModel.findOne({ _id: id })
        if (!data) res.status(404).json({ success: false, Error })
        res.status(200).json({ success: true, data })
    } catch (error) {
        res.status(400).json({ success: false, message: error.message })
    }
}

async function updateById(req, res) {
    const { id } = req.params
    try {
        let lesson = await LessonModel.findOne({ _id: id })
        if (!lesson) return res.status(200).json({ success: false, message: "lesson not founded" })
        await LessonModel.findOneAndUpdate({ _id: id }, req.body)
        res.status(200).json({ success: true, message: "Lesson updated successfully" })
    } catch (error) {
        res.status(400).json({ success: false, message: error.message })
    }
}

async function deleteById(req, res) {
    const { id } = req.params
    try {
        let lesson = await LessonModel.findOne({ _id: id })
        if (!lesson) return res.status(200).json({ success: false, message: "lesson not founded" })
        await LessonModel.findOneAndDelete({ _id: id })
        res.status(200).json({ success: true, message: 'Lesson deleted successfully' })
    } catch (error) {
        res.status(400).json({ success: false, message: error.message })
    }
}

async function home(req, res) {
    try {
        await LessonModel.find({ lang: req.query.lang })
            .sort({ createdAt: -1 })
            .limit(8)
            .exec((err, data) => {
                if (err) return res.status(400).json({ success: false, err })
                return res.status(200).json({ status: true, data })
            })
    } catch (error) {
        res.status(400).json({ success: false, message: error.message })
    }
}

module.exports = { add, all, getById, updateById, deleteById, home }