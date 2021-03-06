const NodeCache = require("node-cache");

const { NewsModel } = require('../models/news.model')

const myCache = new NodeCache({ stdTTL: 100, checkperiod: 120 });

async function add(req, res) {
    let data = new NewsModel(req.body)
    try {
        await data.save()
        res.status(201).json({ success: true, message: "news has been added" })
    } catch (error) {
        res.status(400).json({ success: false, message: error.message })
    }
}

async function getAll(req, res) {
    try {
        if (myCache.has('news')) {
            console.log('getting it from cache')
            return res.status(200).json(myCache.get('news'))
        } else {
            const news = await NewsModel.find()
                .sort({ createdAt: -1 })
            myCache.set('news', news)
            console.log('getting it from api', )
            res.status(200).json({ success: true, data: news });
        }
    } catch (error) {
        res.status(400).json({ success: false, message: error.message })
    }
}

async function getById(req, res) {
    const { id } = req.params
    try {
        const news = await NewsModel.findOne({ _id: id })
        if (!news) res.send(404).json({ success: false, error })
        res.status(200).json({
            success: true,
            news
        })
    } catch (error) {
        res.status(400).json({ success: false, message: error.message })
    }
}

async function deleteById(req, res) {
    const { id } = req.params
    try {
        let news = await NewsModel.findOne({ _id: id })
        if (!news) return res.status(404).json({ success: false, message: "News not founded" })
        await NewsModel.findOneAndDelete({ _id: id })
        res.status(200).json({ success: true, message: "news deleted successful" })
    } catch (error) {
        res.status(400).json({ success: false, message: error.message })
    }
}

async function updateById(req, res) {
    const { id } = req.params
    try {
        let news = await NewsModel.findOne({ _id: id })
        if (!news) return res.status(404).json({ success: false, message: "News not founded" })
        await NewsModel.findOneAndUpdate({ _id: id }, req.body)
        res.status(200).json({ success: true, message: "news has been updated" })
    } catch (error) {
        res.status(400).json({ success: false, message: error.message })
    }
}

async function home(req, res) {
    try {
        await NewsModel.find({ lang: req.query.lang })
            .sort({ createdAt: -1 })
            .limit(5)
            .exec((err, data) => {
                if (err) return res.status(400).json({ success: false, err })
                return res.status(200).json({ status: true, data })
            })
    } catch (error) {
        res.status(400).json({ success: false, message: error.message })
    }
}

async function getHome(req, res) {
    const { id } = req.params
    try {
        let news = await NewsModel.findOne({ _id: id })
        if (!news) return res.status(200).json({ success: false, message: "News not founded" })
        await NewsModel.updateOne({ _id: id }, { $inc: { views: 1 } }, { new: true })
        await NewsModel.findOne({ _id: id })
            .exec(async(error, data) => {
                if (error) return res.status(400).json({ success: false, error })
                if (!data)
                    return res.status(404).json({
                        success: false,
                        error: "Not founded"
                    })
                const last = await NewsModel.find({ lang: data.lang }).sort({ views: -1 }).limit(10)
                res.status(200).json({ success: true, data, last })
            })
    } catch (error) {
        res.status(400).json({ success: false, message: error.message })
    }
}

async function admin(req, res) {
    try {
        await NewsModel.find()
            .sort({ createdAt: -1 })
            .select({ tags: 0, article: 0 })
            .exec((err, data) => {
                if (err) return res.status(400).json({ success: false, err })
                return res.status(200).json({ success: true, data })
            })
    } catch (error) {
        res.status(400).json({ success: false, message: error.message })
    }
}

module.exports = {
    add,
    getAll,
    getById,
    deleteById,
    updateById,
    home,
    getHome,
    admin
}