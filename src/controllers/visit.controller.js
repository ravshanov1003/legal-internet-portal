const Visit = require('../models/visit.model')

exports.create = async(req, res) => {
    const visit = new Visit(req.body)
    try {
        await visit.save()
        res.status(201).json({ success: true, message: 'created successfully' })
    } catch (err) {
        res.status(400).json({ success: false, message: err.message })
    }
}

exports.get = async(req, res) => {
    try {
        const count = await Visit.countDocuments()
        await Visit.find()
            .sort({ createdAt: -1 })
            .limit(parseInt(req.query.limit))
            .skip((req.query.page - 1) * req.query.limit)
            .exec((err, data) => {
                if (err) return res.status(400).json({ success: false, err })
                return res.status(200).json({ success: true, data, count })
            })
    } catch (err) {
        res.status(400).json({ success: false, message: err.message })
    }
}