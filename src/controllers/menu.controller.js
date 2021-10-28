const { MenuModel } = require('../models/menu.model')

exports.add = (req, res) => {
    const menu = MenuModel(req.body)
    menu.save()
        .then(_ => { res.status(200).json({ success: true, message: 'added successfully' }) })
}

exports.update = async(req, res) => {
        // const data = await MenuModel.findOne({ _id: req.params.id })
        // if (!data) return res.json({ success: false, message: "menu not found" })
        await MenuModel.updateOne({ _id: req.params.id }, { $set: req.body }, { new: true }, (err, data) => {
            if (err) return res.status(400).json({ success: false, message: err.message })
            return res.status(200).json({ success: true, message: 'updated successfully' })
        })
    }
    // exports.id = async(req, res) => {
    //     await MenuModel.findOne({ _id: req.params.id }, (err, data) => {
    //         if (err) return res.status(400).json({ success: false, message: err.message })
    //         return res.status(200).json({ success: true, data })
    //     })
    // }

exports.delete = async(req, res) => {
    await MenuModel.deleteOne({ _id: req.params.id }, (err, data) => {
        if (err) return res.status(400).json({ success: false, message: err.message })
        return res.status(200).json({ success: true, message: 'deleted successfully' })
    })
}

exports.all = async(req, res) => {
    try {
        const data = await MenuModel.find()
        res.status(200).json({ success: true, data })
    } catch (error) {
        res.status(400).json({ success: false, message: err.message })
    }
}