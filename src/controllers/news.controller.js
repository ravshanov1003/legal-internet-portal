const jwt = require('jsonwebtoken')

const Log = require('../utils/createLog')
const { NewsModel } = require('../models/news.model')

async function add(req, res) {
    let data = new NewsModel(req.body)
    try {
        await data.save()
        const token = req.headers.authorization
            // console.log(token)
        const user = jwt.decode(token.slice(7))
        Log(user._id, 1, 'News', req.body.title)
        res.send({
            message: "news has been added"
        })
    } catch (error) {
        res.status(400).json({ success: false, message: error.message })
    }
}

async function getAll(req, res) {
    try {
        const news = await NewsModel.find()
        if (!news) res.send(404).json({ success: false, error })
        res.status(200).json({
            success: true,
            news
        })
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
        await NewsModel.findOneAndDelete({ _id: id })
        res.status(200).json({ success: true, message: "news deleted successful" })
    } catch (error) {
        res.status(400).json({ success: false, message: error.message })
    }
}

async function updateById(req, res) {
    const { id } = req.params
    const { title, article, image, lang, text } = req.body
    try {
        await NewsModel.findOneAndUpdate({ _id: id }, {
            title,
            article,
            image,
            lang,
            text
        })
        res.status(200).json({ success: true, message: "news has been updated" })
    } catch (error) {
        res.status(400).json({ success: false, message: error.message })
    }
}

async function home(req, res) {
    try {
        await News.find({ lang: req.query.lang })
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
    try {
        await News.updateOne({ _id: req.params.id }, { $inc: { views: 1 } }, { new: true })
        await News.findOne({ _id: req.params.id })
            .exec(async(error, data) => {
                if (error) return res.status(400).json({ success: false, error })

                if (!data)
                    return res.status(404).json({
                        success: false,
                        error: "Not founded"
                    })
                const last = await News.find({ lang: data.lang }).sort({ views: -1 }).limit(10)
                res.status(200).json({ success: true, data, last })
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
    getHome
}