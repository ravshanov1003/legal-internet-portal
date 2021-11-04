const TestResult = require('../models/testResult.model')

exports.add = (req, res) => {
    const result = new TestResult(req.body)
    result.save()
        .then(() => {
            return res.status(201).json({ success: true })
        })
        .catch((err) => {
            return res.status(400).json({ success: false, message: err.message })
        })
}

exports.get = async(req, res) => {
    await TestResult.aggregate([{
                $group: {
                    _id: "$theme",
                    count: { $sum: 1 },
                    result: { $sum: "$result" }
                }
            },
            { $sort: { result: 1 } },
            {
                $lookup: {
                    from: 'quiz-themes',
                    // localField: '_id',
                    // foreignField: '_id',
                    let: { 'id': '$_id' },
                    pipeline: [
                        { $match: { $expr: { $eq: ['$_id', '$$id'] } } },
                        { $project: { title: 1 } }
                    ],
                    as: '_id'
                }
            },
            { $unwind: '$_id' }
        ])
        .exec((err, data) => {
            if (err) return res.status(400).json({ success: false, message: err.message })
            return res.status(200).json({ success: true, data })
        })
}

exports.getId = async(req, res) => {
    await TestResult.find({ theme: req.params.id })
        .sort({ createdAt: -1 })
        .populate(['theme'])
        .exec((err, data) => {
            if (err) return res.status(400).json({ success: false, message: err.message })
            return res.status(200).json({ success: true, data })
        })
}