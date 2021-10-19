const { VideoModel } = require('../models/videos.model')

async function add(req, res) {
    try {
        await VideoModel.create(req.body)
        res.status(201).json({ success: true, message: "Video created successfully" })
    } catch (error) {
        res.status(400).json({ success: false, message: error.message })
    }
}

async function all(req, res) {
    try {
        const data = await VideoModel.find()
            .sort('-createdAt')
        res.status(200).json({ success: true, data })
    } catch (error) {
        res.status(400).json({ success: false, message: error.message })
    }
}

async function updateById(req, res) {
    const { id } = req.params
    try {
        await VideoModel.findOneAndUpdate({ _id: id }, req.body)
        res.status(200).json({ success: true, message: "video updated successfully" })
    } catch (error) {
        res.status(400).json({ success: false, message: error.message })
    }
}

async function deleteById(req, res) {
    const { id } = req.params
    try {
        await VideoModel.findOneAndDelete({ _id: id })
        res.status(200).json({ success: true, message: 'video deleted successfully' })
    } catch (error) {
        res.status(400).json({ success: false, message: error.message })
    }
}

async function getSize(req, res) {
    try {
        await VideoModel.countDocuments((error, count) => {
            if (error) return res.status(400).json({ success: false, message: error.message })
            res.status(200).json({ success: true, data: count })
        })
    } catch (error) {
        res.status(400).json({ success: false, message: error.message })
    }
}

module.exports = { add, all, updateById, deleteById, getSize }