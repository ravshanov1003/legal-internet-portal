const cron = require('node-cron')
let nodemailer = require("nodemailer")
const router = require('express').Router()
    //const Congratulation = require('../models/congratulation.model')

let transporter = nodemailer.createTransport({ // create mail transporter
    service: "gmail",
    auth: {
        user: "ravshanov1003@gmail.com",
        pass: "user pass"
    }
});

const CronJob = async() => {
    await cron.schedule("* * * * Sunday", function() { // sending emails at periodic intervals
        console.log("Running Cron Job");
        let mailOptions = {
            from: "ravshanov1003@gmail.com",
            to: "tuit@gmail.com",
            subject: `Not a GDPR update ;)`,
            text: `Hi there, this email was automatically sent by me`
        };
        transporter.sendMail(mailOptions, function(error, info) {
            if (error) {
                throw error;
            } else {
                console.log("Email successfully sent!");
            }
        });
    });
}

// const CronJob = async() => {
//     await cron.schedule("* * * 1 September *", router.get('/', async(req, res, next) => {
//         console.log('cron is running')
//         try {
//             const data = await Congratulation.find()
//             res.status(200).json({ success: true, data })
//             next()
//         } catch (error) {
//             res.status(400).json({ message: error.message })
//         }
//     }))
// }

// router.post('/add-cron', async(req, res, next) => {
//     try {
//         const data = await Congratulation(req.body)
//         await data.save()
//         res.status(201).json({ message: "CRON job created" })
//         next()
//     } catch (error) {
//         res.status(400).json({ message: error.message })
//     }
// })

module.exports = { cronRouter: router, CronJob }