const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken");

const { UserModel } = require('../models/user.model')
const log = require("../utils/createLog");

async function getUsers(req, res) {
    try {
        const users = await UserModel.find()
        res.send(users)
    } catch (error) {
        console.log(error)
    }
}

async function getUser(req, res) {
    const { id } = req.params
    try {
        const user = await UserModel.findOne({ _id: id })
        res.send(user)
    } catch (error) {
        console.log(error)
    }
}

async function updateUser(req, res) {
    const { id } = req.params
    const { login, email, fullName, password } = req.body
    try {
        const salt = await bcrypt.genSalt(12)
        const hashPassword = bcrypt.hash(password, salt)
        await UserModel.findOneAndUpdate({ _id: id }, {
                fullName,
                email,
                login,
                hashPassword
            })
            // await updatedUser.save()
        res.json({
            success: true,
            message: "User has been updated"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

async function deleteUser(req, res) {
    const { id } = req.params
    try {
        await UserModel.findOneAndRemove({ _id: id })
        res.json({
            success: true,
            message: "User has been deleted successfully"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

module.exports = {
    getUsers,
    getUser,
    updateUser,
    deleteUser
}