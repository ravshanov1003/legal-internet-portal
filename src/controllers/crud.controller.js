const router = require('express').Router()

const { VideoModel } = require('../models/videos.model')
const { BooksModel } = require('../models/books.model')
const { SiteModel } = require('../models/sites.model')

const Model = [BooksModel, SiteModel, VideoModel]
const req = ['books', 'sites', 'videos']

router.get(`/${req[0]}`, getAll(Model[0]))

function getAll(model) {
    return async function all(req, res) {
        try {
            const data = model.find()
            res.status(200).json({ success: true }, data)
        } catch (error) {
            res.status(400).json({ success: false, message: error.message })
        }
    }
}


module.exports = { router }