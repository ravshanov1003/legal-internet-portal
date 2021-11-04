const LegalGlossary = require('../models/legalGlossary.model')

exports.admin = async(req, res) => {
    const dts = []
    const cds = []
    const { lang, page, limit, search } = req.query
    const skip = (page - 1) * limit
    if (lang != 'all') {
        console.log(lang)
        dts.push({ $match: { "lang": lang } })
        cds.push({ $match: { "lang": lang } })
    }
    if (search) {
        dts.push({
            $match: { "term": { $regex: req.query.search, $options: "$i" } }
        })
        cds.push({
            $match: { "term": { $regex: req.query.search, $options: "$i" } }
        })
    }
    dts.push({ $sort: { createdAt: -1 } }, { $skip: skip }, { $limit: parseInt(limit) })
    cds.push({ $sort: { createdAt: -1 } })
    const count = await LegalGlossary.aggregate(cds)
    await LegalGlossary.aggregate(dts)
        .exec((err, data) => {
            if (err) return res.status(400).json({ success: false, err })
            return res.status(200).json({ success: true, data, count: count.length })
        })
}

exports.getAll = async(req, res) => {
    const { term, page, limit, lang } = req.query
    const PAGE_SIZE = parseInt(limit) || 10
    const skip = (parseInt(page) - 1) * PAGE_SIZE || 0
    const count = await LegalGlossary.countDocuments({ lang: lang })
    try {
        let data;
        if (term && term != 'all') {
            data = await LegalGlossary.aggregate([{ $match: { "lang": lang }, },
                { $match: { "term": { $regex: term, $options: 'i' } }, },
                { $sort: { term: 1 } },
                { $limit: PAGE_SIZE },
                { $skip: skip }
            ])
            await LegalGlossary.updateMany({
                $and: [{ lang: lang }, { term: { $regex: term, $options: 'i' } }]
            }, { $inc: { views: 1 } }, { new: true })
        } else {
            data = await LegalGlossary.find({ lang: lang })
                .sort({ term: 1 })
                .skip(skip)
                .limit(PAGE_SIZE)
            await LegalGlossary.updateMany({ lang: lang }, { $inc: { views: 1 } }, { new: true })
        }
        res.status(200).json({ success: true, data, count })
    } catch (error) {
        res.status(404).json({ success: false, message: error.message })
    }
}

exports.add = async(req, res) => {
    let data = new LegalGlossary(req.body)
    try {
        data = await data.save()
        if (!data) return res.status(400).json({ success: false, error: "not added" })
        res.status(201).json({ success: true, message: 'added successfully' })
    } catch (error) {
        res.status(400).json({ success: false, message: error.message })
    }
}

exports.updateById = async(req, res) => {
    await LegalGlossary
        .findByIdAndUpdate(req.params.id, req.body, { runValidators: true })
        .exec((error, data) => {
            if (error) return res.status(400).json({ success: false, message: error.message })
            const token = req.headers.authorization
            const user = jwt.decode(token.slice(7))
            log(user._id, 2, 'Yuridik lug`at', data.term)
            res.status(200).json({ success: true })
        })
}

exports.deleteById = async(req, res) => {
    const leg = await LegalGlossary.findOne({ _id: req.params.id })
    const token = req.headers.authorization
    const user = jwt.decode(token.slice(7))
    await log(user._id, 3, 'Yuridik lug`at', leg.term)
    await LegalGlossary.findByIdAndDelete(req.params.id)
        .exec((error, data) => {
            if (error) return res.status(400).json({ success: false, message: error.message })
            if (!data) return res.status(400).json({ success: false, error: "O'chirilmadi" })
            res.status(200).json({ success: true })
        })
}

exports.getById = async(req, res) => {
    await LegalGlossary.findOne({ _id: req.params.id })
        .exec((err, data) => {
            if (err) return res.status(400).json({ success: false, err })
            return res.status(200).json({ success: true, data })
        })
}
exports.filterByChar = async(req, res) => {
    const { char, lang, page, limit } = req.query
    const skip = (page - 1) * limit

    const count = await LegalGlossary.countDocuments({
        $and: [{ lang: lang }, { term: { $regex: '^' + char, $options: 'i' } }]
    })
    await LegalGlossary.aggregate([{ $match: { lang: lang } },
            { $match: { "term": { $regex: '^' + char, $options: 'i' } } },
            { $sort: { term: 1 } },
            { $skip: skip },
            { $limit: parseInt(limit) }
        ])
        .exec((error, data) => {
            if (error) return res.status(400).json({ success: false, error })
            res.status(200).json({ success: true, data, count: count })
        })
}