const { SiteModel } = require('../models/sites.model')

async function add(req, res) {
    const data = new SiteModel(req.body)
    try {
        await data.save()
        res.status(201).json({ success: true, message: "created successfully" })
    } catch (error) {
        res.status(400).json({ success: false, message: error.message })
    }
}

async function getAll(req, res) {
    try {
        const count = await SiteModel.countDocuments()
        const { page, limit } = req.query
        const PAGE_SIZE = parseInt(limit) || 12
        const skip = (parseInt(page) - 1) * PAGE_SIZE || 0
        await SiteModel.find()
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(PAGE_SIZE)
            .exec((error, data) => {
                if (error) return res.status(404).json({ success: false, message: error.message })
                res.status(201).json({ success: true, data, count })
            })
    } catch (error) {
        res.status(400).json({ success: false, message: error.message })
    }
}

async function deleteById(req, res) {
    const { id } = req.params
    try {
        await SiteModel.findOneAndDelete({ _id: id })
        res.status(200).json({ success: true, message: 'deleted successfully' })
    } catch (error) {
        res.status(400).json({ success: false, message: error.message })
    }
}

async function updateById(req, res) {
    try {
        await SiteModel.findOneAndUpdate({ _id: req.params.id }, req.body)
        res.json({ success: true, message: "site has been updated" })
    } catch (error) {
        res.status(400).json({ success: false, message: error.message })
    }
}

module.exports = { add, getAll, deleteById, updateById }