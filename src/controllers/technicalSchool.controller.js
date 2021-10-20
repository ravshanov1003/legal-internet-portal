const path = require('path')
const fs = require('fs')
const File = require('../models/files.model')
const { TSModel } = require('../models/technicalSchool.model')
const { TSFModel } = require('../models/technicalSchoolFaculty.model')

async function add() {
    let data = new TSModel(req.body)
    try {
        await data.save()
        res.status(201).json({ success: true, message: "created successfully" })
    } catch (error) {
        res.status(400).json({ success: false, message: error.message })
    }
}

async function all(req, res) {
    try {
        const data = await TSModel.find().sort({ createdAt: -1 })
        res.status(200).json({ success: true, data })
    } catch (error) {
        res.status(400).json({ success: false, message: error.message })
    }
}

module.exports = { add, all }