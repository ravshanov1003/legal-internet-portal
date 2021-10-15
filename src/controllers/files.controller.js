const fs = require('fs')
const path = require('path')

const { FileModel } = require('../models/files.model')

exports.upload = async(req, res) => {
    if (!req.file) return res.status(400).json({ success: false, error: 'Image has not uploaded' })
    let data = new FileModel({ path: req.file.path })
    try {
        data = await data.save()
        if (!data)
            return res.status(400).json({ success: false, error: "File has not saved" })
        res.status(200).json({ success: true, data: { _id: data._id, path: data.path } })
    } catch (error) {
        res.status(400).json({ success: false, message: error.message })
    }
}

exports.delete = async(req, res) => {
    const { id } = req.params
    try {
        let data = await FileModel.findById(id)
        if (!data) return res.status(404).json({ success: false, error: "not found" })
        fs.unlink(path.join(__dirname + `../../files/${data.path}`), async error => {
            if (!error) await FileModel.findByIdAndDelete(id)
        })
        res.status(200).json({ success: true, message: 'file has been deleted' })
    } catch (error) {
        res.status(400).json({ success: false, message: error.message })
    }
}

exports.getAll = async(req, res) => {
    try {
        console.log(req.file)
        const data = await FileModel.find()
        res.status(200).json({ success: true, data })
    } catch (error) {
        res.status(400).json({ success: false, message: error.message })
    }
}