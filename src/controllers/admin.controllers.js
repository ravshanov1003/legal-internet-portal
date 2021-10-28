const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken");
const redis = require('redis')

const { UserModel } = require('../models/user.model')

const REDIS_PORT = process.env.REDIS_PORT || 6379
const client = redis.createClient(REDIS_PORT)

// async function users(req, res) {
//     try {
//         // const user = await getOrSetCache('users', async() => {
//         //     const users = await UserModel.find()
//         //     return users
//         // })
//         console.log('Fetching data... (users)')
//         const users = await UserModel.find()
//         client.setex('users', 3600, JSON.stringify(users))
//         res.status(200).json({ success: true, users })
//     } catch (error) {
//         res.status(400).json({ success: false, message: error.message })
//     }
// }

// function getOrSetCache(key, cb) {
//     return new Promise((resolve, reject) => {
//         client.get(key, async(err, data) => {
//             if (err) return reject(err)
//             if (data !== null) return resolve(JSON.parse(data))
//             const freshData = await cb()
//             client.setex(key, 3600, JSON.stringify(freshData))
//             resolve(freshData)
//         })
//     })
// }

async function getUsers(req, res) {
    try {
        console.log('Fetching data... (users)')
        const users = await UserModel.find()
            .sort({ createdAt: -1 })
        client.setex('users', 600, JSON.stringify(users))
        res.status(200).json({ success: true, users })
    } catch (error) {
        res.status(400).json({ success: false, message: error.message })
    }
}

async function getUser(req, res) {
    const { id } = req.params
    try {
        const user = await UserModel.findOne({ _id: id })
        res.status(200).json({ success: true, user })
    } catch (error) {
        res.status(400).json({ success: false, message: error.message })
    }
}

async function updateUser(req, res) {
    const { id } = req.params
    const { login, email, fullName, password } = req.body
    try {
        let user = await UserModel.findOne({ _id: id })
        if (!user) return res.status(200).json({ success: false, message: "User not founded" })
        const salt = await bcrypt.genSalt(12)
        const hashPassword = bcrypt.hash(password, salt)
        await UserModel.findOneAndUpdate({ _id: id }, {
                fullName,
                email,
                login,
                hashPassword
            })
            // await updatedUser.save()
        res.json({ success: true, message: "User has been updated" })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}

async function deleteUser(req, res) {
    const { id } = req.params
    try {
        let user = await UserModel.findOne({ _id: id })
        if (!user) return res.status(200).json({ success: false, message: "User not founded" })
        await UserModel.findOneAndRemove({ _id: id })
        res.json({ success: true, message: "User has been deleted successfully" })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}

module.exports = {
    getUsers,
    getUser,
    updateUser,
    deleteUser,
    //users
}