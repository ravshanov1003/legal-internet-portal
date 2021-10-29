const cron = require('node-cron')
const router = require('express').Router()

const Congratulation = require('../models/congratulation.model')

const CronJob = async() => {
    await cron.schedule("10 * * * *", router.get('/', async(req, res, next) => {
        console.log('cron is running')
        try {
            const data = await Congratulation.find()
            res.status(200).json({ success: true, data })
            next()
        } catch (error) {
            res.status(400).json({ message: error.message })
        }
    }))
}

router.post('/add-cron', async(req, res, next) => {
    try {
        const data = await Congratulation(req.body)
        await data.save()
        res.status(201).json({ message: "CRON job created" })
        next()
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

module.exports = { cronRouter: router, CronJob }