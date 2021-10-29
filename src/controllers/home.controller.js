const { NewsModel } = require('../models/news.model')
const { SiteModel } = require('../models/sites.model')
const { BooksModel } = require('../models/books.model')
const { VideoModel } = require('../models/videos.model')
const { LessonModel } = require('../models/course.model')
const { ProblemModel } = require('../models/problem.model')

exports.news = async(req, res) => {
    try {
        await NewsModel.find( /*{ lang: req.params.lang }*/ )
            .sort('-createdAt')
            .limit(5)
            .exec((error, data) => {
                if (error) return res.status(404).json({ success: false, error })

                res.status(200).json({ success: true, data })
            })
    } catch (error) { throw error }
}

exports.video = async(req, res) => {
    try {
        await VideoModel.find()
            .sort('-createdAt')
            .limit(5)
            .exec((error, data) => {
                if (error) return res.status(404).json({ success: false, error })

                res.status(200).json({ success: true, data })
            })
    } catch (error) { throw error }
}

exports.site = async(req, res) => {
    try {
        await SiteModel.find()
            .sort('-createdAt')
            .exec((error, data) => {
                if (error) return res.status(404).json({ success: false, error })

                res.status(200).json({ success: true, data })
            })
    } catch (error) { throw error }
}

exports.library = async(req, res) => {
    try {
        await BooksModel.find()
            .sort('-createdAt')
            .limit(8)
            .exec((error, data) => {
                if (error) return res.status(404).json({ success: false, error })

                res.status(200).json({ success: true, data })
            })
    } catch (error) { throw error }
}

exports.course = async(req, res) => {
    try {
        await LessonModel.find()
            .sort('-createdAt')
            .limit(6)
            .exec((error, data) => {
                if (error) return res.status(404).json({ success: false, error })

                res.status(200).json({ success: true, data })
            })
    } catch (error) { throw error }
}

exports.search = async(req, res) => {
    console.log(req.query)
    const { text, lang } = req.query
    const news = await NewsModel.find({
        $or: [
            { 'title': { $regex: text, $options: 'i' } },
            { 'article': { $regex: text, $options: 'i' } }
        ]
    })
    const problems = await ProblemModel.find({
        $or: [
            { 'title': { $regex: text, $options: 'i' } },
            { 'article': { $regex: text, $options: 'i' } }
        ]
    })
    const books = await BooksModel.find({
        $or: [
            { 'title': { $regex: text, $options: 'i' } }
        ]
    })
    res.status(200).json({ success: true, data: { news, problems, books } })
}

exports.tag = async(req, res) => {
    const { tag, lang } = req.query
    try {
        const news = await NewsModel.find({ $and: [{ lang: lang }, { tags: { $in: tag } }] }, null, { sort: '-createdAt', limit: 10 })
        const problems = await ProblemModel.find({ $and: [{ lang: lang }, { tags: { $in: tag } }] }, null, { sort: '-createdAt', limit: 10 })
        const book = await BooksModel.find({ $and: [{ lang: lang }, { tags: { $in: tag } }] }, null, { sort: '-createdAt', limit: 10 })
        res.status(200).json({ success: true, data: { news, problems, book } })
    } catch (error) {
        res.status(400).json({ success: false, error })
    }
}

exports.dashboard = async(req, res) => {
    const dts = []
    if (req.query.lang != 'all') {
        dts.push({ $match: { lang: req.query.lang } })
    }
    dts.push({ $match: { createdAt: { $gte: new Date(req.query.start), $lte: new Date(req.query.end) } } })
    const news = await NewsModel.aggregate(dts)
    const problem = await ProblemModel.aggregate(dts)
    const books = await BooksModel.aggregate(dts)
    const data = { news, problem, books }
    res.status(200).json({ success: true, data })
}