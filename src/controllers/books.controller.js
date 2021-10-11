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

module.exports = { add, getAll, getById, deleteById, updateById }