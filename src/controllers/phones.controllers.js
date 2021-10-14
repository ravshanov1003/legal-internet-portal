const { PhoneModel } = require('../models/phones.model')

async function add(req, res) {
    try {
        const lastDat = await PhoneModel.findOne().sort({ createdAt: -1 }).exec();
        const num = lastDat ? lastDat.position + 1 : 1;
        let data = new PhoneModel(req.body)
        data.position = num
        await data.save()
        res.status(201).json({ success: true, message: "phone has been created" })
    } catch (error) {
        res.status(400).json({ success: false, message: error.message })
    }
}

async function getAll(req, res) {
    try {
        const data = await PhoneModel.find()
            .sort({ position: 1 })
            // .populate("catalog")
        if (!data) res.send(404).json({ success: false, message: "phone not founded" })
        res.status(200).json({ success: true, data })
    } catch (error) {
        res.status(400).json({ success: false, message: error.message })
    }
}

async function updateById(req, res) {
    const { id } = req.params
    try {
        await PhoneModel.findOneAndUpdate({ _id: id }, req.body)
        res.status(200).json({ success: true, message: "phone has been updated" })
    } catch (error) {
        res.status(400).json({ success: false, message: error.message })
    }
}

async function deleteById(req, res) {
    const { id } = req.params
    try {
        await PhoneModel.findOneAndDelete({ _id: id })
        res.status(200).json({ success: true, message: "phone has been deleted" })
    } catch (error) {
        res.status(400).json({ success: false, message: error.message })
    }
}

async function search(req, res) {
    let { text } = req.query
    text += " "
    console.log(req.query)
    try {
        await PhoneModel.find({
                $or: [
                    { 'title.uz': { $regex: text, $options: 'i' } },
                    { 'title.ru': { $regex: text, $options: 'i' } },
                    { 'title.cy': { $regex: text, $options: 'i' } },
                ]
            })
            .populate('catalog')
            .exec((error, data) => {
                if (error) return res.status(400).json({ success: false, message: error.message })
                res.status(200).json({ success: true, data })
            })
    } catch (error) {
        res.status(400).json({ success: false, message: error.message })
    }
}

module.exports = { add, getAll, updateById, deleteById, search }