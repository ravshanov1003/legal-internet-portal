const { BooksModel } = require('../models/books.model')

async function add(req, res) {
    const { title, description, author, organization, lang, year, catalog, file, image, tags, view, downloads, slug } = req.body
    try {
        let book = new BooksModel({ title, description, author, organization, lang, year, catalog, file, image, tags, view, downloads, slug })
        await book.save()
        res.status(200).json({ success: true, message: "book has been created" })
    } catch (error) {
        res.status(400).json({ success: false, message: error.message })
    }
}

async function getAll(req, res) {
    try {
        const books = await BooksModel.find()
            .sort({ createdAt: -1 })
        res.status(200).json({ success: true, books })
    } catch (error) {
        res.status(400).json({ success: false, message: error.message })
    }
}

async function getById(req, res) {
    const { id } = req.params
    try {
        const book = await BooksModel.findOne({ _id: id })
        if (!book) return res.status(404).json({ success: false, message: "book has not founded" })
        res.status(200).json({ success: true, book })
    } catch (error) {
        res.status(400).json({ success: false, message: error.message })
    }
}

async function deleteById(req, res) {
    const { id } = req.params
    try {
        await BooksModel.findOneAndDelete({ _id: id })
        res.status(200).json({ success: true, message: "book deleted successfully" })
    } catch (error) {
        res.status(400).json({ success: false, message: error.message })
    }
}

async function updateById(req, res) {
    const { id } = req.params
    try {
        await BooksModel.findOneAndUpdate({ _id: id }, { $set: req.body })
        res.status(200).json({ success: true, message: 'book has been updated' })
    } catch (error) {
        res.status(400).json({ success: false, message: error.message })
    }
}

async function getTop(req, res) {
    try {
        const topBook = await BooksModel.find({}, null, { sort: '-downloads', limit: 6 })
        if (!topBook) return res.status(404).json({ success: false, message: "top book not founded" })
        res.status(200).json({ success: true, topBook })
    } catch (error) {
        res.status(400).json({ success: false, message: error.message })
    }
}

async function search(req, res) {
    try {
        await BooksModel.find({ title: { $regex: req.params.text, $options: 'i' } })
            .sort({ createdAt: -1 })
            .limit(parseInt(req.query.limit))
            .skip((req.query.page - 1) * req.query.limit)
            .exec((err, data) => {
                if (err) return res.status(400).json({ success: false, err })
                return res.status(200).json({ success: true, data })
            })
    } catch (error) {
        res.status(400).json({ success: false, message: error.message })
    }
}

async function admin(req, res) {
    try {
        await BooksModel.find()
            .sort({ createdAt: -1 })
            .select({ title: 1, image: 1, view: 1, downloads: 1, catalog: 1, lang: 1, createdAt: 1 })
            .populate('catalog')
            .exec((err, data) => {
                if (err) return res.status(400).json({ success: false, err })
                return res.status(200).json({ success: true, data })
            })
    } catch (error) {
        res.status(400).json({ success: false, message: error.message })
    }
}
async function home(req, res) {
    try {
        await BooksModel.find({ lang: req.query.lang })
            .sort({ createdAt: -1 })
            .limit(8)
            .select({ title: 1, slug: 1, year: 1, image: 1 })
            .exec((err, data) => {
                if (err) return res.status(400).json({ success: false, err, })
                return res.status(200).json({ success: true, data })
            })
    } catch (error) {
        res.status(400).json({ success: false, message: error.message })
    }
}

module.exports = { add, getAll, getById, deleteById, updateById, getTop, search, admin, home }