const { ProblemFAQ_Model } = require('../models/problemFAQ.model')
const { ProblemThemeModel } = require('../models/problemTheme.model')

async function add(req, res) {
    let data = new ProblemThemeModel(req.body)
    try {
        data = await data.save()
        if (!data)
            return res.status(400).json({
                success: false,
                error: "The data was not entered correctly"
            })
        res.status(201).json({ success: true, message: 'ProblemTheme has been created' })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}

async function all(req, res) {
    try {
        const data = await ProblemThemeModel.find()
            .sort('-createdAt')
        res.status(200).json({ success: true, data })
    } catch (error) {
        res.status(400).json({ success: false, message: error.message })
    }
}

async function search(req, res) {
    const { text, limit, page } = req.query
    console.log(req.query)
    try {
        await ProblemThemeModel.find({ name: { $regex: text, $options: 'i' } })
            .sort({ createdAt: -1 })
            .limit(parseInt(limit))
            .skip((page - 1) * limit)
            .exec((err, data) => {
                if (err) return res.status(400).json({ success: false, message: err.message })
                return res.status(200).json({ success: true, data })
            })
    } catch (error) {
        res.status(400).json({ success: false, message: error.message })
    }
}

async function updateById(req, res) {
    const { id } = req.params
    try {
        await ProblemThemeModel.findOneAndUpdate({ _id: id }, req.body)
        res.status(200).json({ success: true, message: "ProblemTheme updated successfully" })
    } catch (error) {
        res.status(400).json({ success: false, message: error.message })
    }
}

async function deleteById(req, res) {
    const { id } = req.params
    try {
        await ProblemThemeModel.findOneAndDelete({ _id: id })
        res.status(200).json({ success: true, message: 'ProblemTheme deleted successfully' })
    } catch (error) {
        res.status(400).json({ success: false, message: error.message })
    }
}

async function getQuestion4Problem(req, res) {
    const { id } = req.params
    try {
        await ProblemFAQ_Model.find({ catalog: parseInt(id) })
            .sort({ createdAt: -1 })
            .exec((err, data) => {
                if (err) return res.status(400).json({ success: false, err })
                return res.status(200).json({ success: true, data })
            })
    } catch (error) {
        res.status(400).json({ success: false, message: error.message })
    }
}

async function home(req, res) {
    const id = parseInt(req.query.id)
    try {
        const faqs = await ProblemFAQ_Model.find({ $and: [{ lang: req.query.lang }, { catalog: id }] })
            .sort({ createdAt: -1 })
        await ProblemThemeModel.aggregate([
                { $match: { lang: req.query.lang } },
                { $match: { catalog: id } },
                { $sort: { createdAt: -1 } },
                {
                    $lookup: {
                        from: 'problems',
                        // localField: '_id',
                        // foreignField: 'theme',
                        let: { 'id': '$_id' },
                        pipeline: [
                            { $match: { $expr: { $eq: ['$theme', '$$id'] } } },
                            {
                                $project: {
                                    title: 1
                                }
                            }
                        ],
                        as: 'child'
                    }
                },
                {
                    $project: {
                        child: 1,
                        name: 1
                    }
                }
            ])
            .exec((err, data) => {
                if (err) return res.status(400).json({ success: false, err })
                return res.status(200).json({ success: true, data, faqs })
            })
    } catch (error) {
        res.status(400).json({ success: false, message: error.message })
    }
}

module.exports = { add, all, search, deleteById, updateById, getQuestion4Problem, home }