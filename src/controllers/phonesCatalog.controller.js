const { PhonesCatalog } = require('../models/phonesCatalog.model.js')

async function add(req, res) {
    const lastDat = await PhonesCatalog.findOne().sort({ createdAt: -1 }).exec();
    const num = lastDat ? lastDat.position + 1 : 1;
    const data = new PhonesCatalog(req.body)
    data.position = num
    try {
        await data.save()
        res.status(201).json({ success: true, message: "Phone Catalog has been created" })
    } catch (error) {
        res.status(400).json({ success: false, message: error.message })
    }
}

async function getAll(req, res) {
    try {
        const phonesCatalog = await PhonesCatalog.find()
            .sort({ position: 1 })
        if (!phonesCatalog) res.status(404).json({ success: false, message: 'Not found' })
        res.status(200).json({ success: true, phonesCatalog })
    } catch (error) {
        res.status(400).json({ success: false, message: error.message })
    }
}

async function updateById(req, res) {
    const { id } = req.params
    try {
        let catalog = await PhonesCatalog.findOne({ _id: id })
        if (!catalog) return res.status(200).json({ success: false, message: "catalog not founded" })
        await PhonesCatalog.findOneAndUpdate({ _id: id }, req.body)
        res.json({ success: true, message: "phoneCatalog updated successfully" })
    } catch (error) {
        res.status(400).json({ success: false, message: error.message })
    }
}

async function deleteById(req, res) {
    const { id } = req.params
    try {
        let catalog = await PhonesCatalog.findOne({ _id: id })
        if (!catalog) return res.status(200).json({ success: false, message: "catalog not founded" })
        await PhonesCatalog.findOneAndDelete({ _id: id })
            .exec((err, data) => {
                if (err) res.status(400).json({ success: false, message: err.message })
                res.status(200).json({ success: true, message: "phoneCatalog deleted successfully" })
            })
    } catch (error) {
        res.status(400).json({ success: false, message: error.message })
    }
}

module.exports = { add, getAll, updateById, deleteById }