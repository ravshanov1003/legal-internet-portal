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

module.exports = {
    getUsers,
    getUser,
}