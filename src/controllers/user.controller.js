const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const { UserModel } = require('../models/user.model')

async function createUser(req, res) {
    const { login, email, fullName, password, userType } = req.body
    try {
        const hashedPassword = await bcrypt.hash(password, 12)
        const newUser = await UserModel.create({
            login,
            email,
            fullName,
            password: hashedPassword,
            userType
        })
        await newUser.save()
        res.send({
            message: "User has been created"
        })
    } catch (error) {
        res.status(500).send({
            message: error.message
        })
    }
}

async function deleteUser(req, res) {
    const { id } = req.params
    try {
        await UserModel.findOneAndRemove({ _id: id })
        res.send({
            message: "User has been deleted successfully"
        })
    } catch (error) {
        res.status(500).send({
            message: error.message
        })
    }
}

async function login(req, res) {
    const { login, password } = req.body
    try {
        // Check #1 :
        if (!login || !password)
            return res.status(401).json({
                    success: false,
                    error: "login or password has not written"
                })
                // Check #2 :check username
        await UserModel.findOne({ login }, { password: 1 })
            .exec(async(error, data) => {
                if (error) return res.status(401).json({ success: false, error })
                if (!data)
                    return res.status(401).json({
                            success: false,
                            error: "login or password is incorrect"
                        })
                        // Check #3 :check password
                const isMatch = await bcrypt.compare(password, data.password)
                if (!isMatch)
                    return res.status(400).json({
                        success: false,
                        error: "login or password is incorrect"
                    })
                const token = data.generateAuthToken()
                res.status(200).json({ success: true, token })
            })
    } catch (error) {
        res.send({ message: error })
    }
}

module.exports = {
    createUser,
    deleteUser,
    login
}