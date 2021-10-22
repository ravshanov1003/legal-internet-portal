const { BooksCatalogModel } = require('../models/booksCatalog.model')

async function add(req, res) {
    let data = new BooksCatalogModel(req.body)
    try {
        data = await data.save()
        if (!data) res.status(400).json({ success: false, message: "data is not completed" })
        res.status(200).json({ success: true, message: "BooksCatalog created successfully" })
    } catch (error) {
        res.status(400).json({ success: false, message: error.message })
    }
}

async function getAll(req, res) {
    try {
        const data = await BooksCatalogModel.find()
            .sort({ createdAt: -1 })
        res.status(200).json({ success: true, data })
    } catch (error) {
        res.status(400).json({ success: false, message: error.message })
    }
}

async function updateById(req, res) {
    const { id } = req.params
    try {
        let books_catalog = await BooksCatalogModel.findOne({ _id: id })
        if (!books_catalog) return res.status(200).json({ success: false, message: "books_catalog not founded" })
        await BooksCatalogModel.findOne({ _id: id })
            .updateOne({ $set: req.body }, { new: true })
        res.status(200).json({ success: true, message: "BooksCatalog has been updated successfully" })
    } catch (error) {
        res.status(400).json({ success: false, message: error.message })
    }
}

async function deleteById(req, res) {
    const { id } = req.params
    try {
        let books_catalog = await BooksCatalogModel.findOne({ _id: id })
        if (!books_catalog) return res.status(200).json({ success: false, message: "books_catalog not founded" })
        await BooksCatalogModel.findOneAndDelete({ _id: id })
        res.status(200).json({ success: true, message: "deleted successfully" })
    } catch (error) {
        res.status(400).json({ success: false, message: error.message })
    }
}

module.exports = {
    add,
    getAll,
    updateById,
    deleteById
}