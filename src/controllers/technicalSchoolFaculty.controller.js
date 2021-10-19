const { TSFModel } = require('../models/technicalSchoolFaculty.model')

async function add(req, res) {
    const data = new TSFModel(req.body)
    try {
        await data.save()
        res.status(201).json({ success: true, message: "created successfully" })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}

async function all(req, res) {
    try {
        const data = await TSFModel.find()
            .sort('-createdAt')
        res.status(200).json({ success: true, data })
    } catch (error) {
        res.status(400).json({ success: false, message: error.message })
    }
}

async function getById(req, res) {
    const { id } = req.params
    try {
        const data = await TSFModel.findOne({ _id: id })
        if (!data) res.status(404).json({ success: false, Error })
        res.status(200).json({ success: true, data })
    } catch (error) {
        res.status(400).json({ success: false, message: error.message })
    }
}

async function updateById(req, res) {
    const { id } = req.params
    try {
        await TSFModel.findOneAndUpdate({ _id: id }, req.body)
        res.status(200).json({ success: true, message: "Lesson updated successfully" })
    } catch (error) {
        res.status(400).json({ success: false, message: error.message })
    }
}

async function deleteById(req, res) {
    const { id } = req.params
    try {
        await TSFModel.findOneAndDelete({ _id: id })
        res.status(200).json({ success: true, message: 'Lesson deleted successfully' })
    } catch (error) {
        res.status(400).json({ success: false, message: error.message })
    }
}


module.exports = { add, all, getById, updateById, deleteById }