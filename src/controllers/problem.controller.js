const { ProblemModel } = require('../models/problem.model')

async function all(req, res) {
    try {
        const data = await ProblemModel.find()
            .sort({ "createdAt": -1 })
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}

async function add(req, res) {
    let data = new ProblemModel(req.body)
    try {
        data = await data.save()
        if (!data)
            return res.status(400).json({
                success: false,
                error: "The data was not entered correctly"
            })
        res.status(201).json({ success: true, message: 'problem has been created' })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}

async function getByTheme(req, res) {
    try {
        await ProblemModel.find({ theme: req.params.id })
            .sort({ createdAt: -1 })
            .exec((err, data) => {
                if (err) return res.status(400).json({ success: false, message: err.message })
                return res.status(200).json({ success: true, data })
            })
    } catch (error) {
        res.status(400).json({ success: false, message: error.message })
    }
}

async function getById(req, res) {
    const { id } = req.params
    try {
        const data = await ProblemModel.findOne({ _id: id })
        if (!data) res.status(404).json({ success: false, Error })
        res.status(200).json({ success: true, data })
    } catch (error) {
        res.status(400).json({ success: false, message: error.message })
    }
}

async function updateById(req, res) {
    const { id } = req.params
    try {
        let problem = await ProblemModel.findOne({ _id: id })
        if (!problem) return res.status(200).json({ success: false, message: "problem not founded" })
        await ProblemModel.findOneAndUpdate({ _id: id }, req.body)
        res.status(200).json({ success: true, message: "problem updated successfully" })
    } catch (error) {
        res.status(400).json({ success: false, message: error.message })
    }
}

async function deleteById(req, res) {
    const { id } = req.params
    try {
        let problem = await ProblemModel.findOne({ _id: id })
        if (!problem) return res.status(200).json({ success: false, message: "problem not founded" })
        await ProblemModel.findOneAndDelete({ _id: id })
        res.status(200).json({ success: true, message: 'problem deleted successfully' })
    } catch (error) {
        res.status(400).json({ success: false, message: error.message })
    }
}

async function helpful(req, res) {
    const { id, helpful } = req.params
    try {
        const data = helpful == 1 ?
            await ProblemModel
            .findByIdAndUpdate(id, { $inc: { helpful: 1 } }) :
            await ProblemModel
            .findByIdAndUpdate(id, { $inc: { notHelpful: 1 } })
        if (!data)
            return res.status(400).json({
                success: false,
                error: "do not updated"
            })
        res.status(200).json({ success: true })
    } catch (error) {
        res.status(400).json({ success: false, message: error.message })
    }
}

module.exports = { all, add, getByTheme, getById, deleteById, updateById, helpful }