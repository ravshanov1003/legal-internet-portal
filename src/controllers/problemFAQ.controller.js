const { ProblemFAQ_Model } = require('../models/problemFAQ.model')

async function add(req, res) {
    let data = new ProblemFAQ_Model(req.body)
    try {
        data = await data.save()
        if (!data)
            return res.status(400).json({
                success: false,
                error: "The data was not entered correctly"
            })
        res.status(201).json({ success: true, message: 'ProblemFAQ has been created' })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}

async function all(req, res) {
    try {
        const data = await ProblemFAQ_Model.find()
            .sort('-createdAt')
        res.status(200).json({ success: true, data })
    } catch (error) {
        res.status(400).json({ success: false, message: error.message })
    }
}

async function getById(req, res) {
    const { id } = req.params
    try {
        const data = await ProblemFAQ_Model.findOne({ _id: id })
        if (!data) res.status(404).json({ success: false, Error })
        res.status(200).json({ success: true, data })
    } catch (error) {
        res.status(400).json({ success: false, message: error.message })
    }
}

async function updateById(req, res) {
    const { id } = req.params
    try {
        await ProblemFAQ_Model.findOneAndUpdate({ _id: id }, req.body)
        res.status(200).json({ success: true, message: "ProblemFAQ updated successfully" })
    } catch (error) {
        res.status(400).json({ success: false, message: error.message })
    }
}

async function deleteById(req, res) {
    const { id } = req.params
    try {
        await ProblemFAQ_Model.findOneAndDelete({ _id: id })
        res.status(200).json({ success: true, message: 'ProblemFAQ deleted successfully' })
    } catch (error) {
        res.status(400).json({ success: false, message: error.message })
    }
}

module.exports = { add, all, getById, deleteById, updateById }