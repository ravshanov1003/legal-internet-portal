const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const { UserModel } = require('../models/user.model')
const log = require('../utils/createLog')

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

async function login(req, res) {
    const { login, password } = req.body
    console.log(req.body)
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
                            error: "login or password is incorrect #1"
                        })
                        // Check #3 :check password
                const isMatch = await bcrypt.compare(password, data.password)
                    // if (!isMatch)
                    //     return res.status(400).json({
                    //         success: false,
                    //         error: "login or password is incorrect #2"
                    //     })
                const token = data.generateAuthToken()
                res.status(200).json({ success: true, token })
            })
    } catch (error) {
        res.send({ message: error.message })
    }
}

async function me(req, res) {
    const token = req.headers.authorization
    const user = jwt.decode(token.slice(7));
    try {
        await UserModel.findById(user._id, { password: 0 })
            .exec((error, data) => {
                if (error) return res.status(401).json({ success: false, error })
                if (!data)
                    return res.status(401).json({
                        success: false,
                        error: "data were not collected"
                    })
                res.status(200).json({ success: true, data })
            })
    } catch (error) {
        res.send({ message: error.message })
    }
}

async function signup(req, res) {
    const { login, fullName, email, password } = req.body
    if (!(login, fullName || email || password))
        return res.status(400).json({
            success: false,
            error: "The information is incomplete"
        })
    try {
        const salt = await bcrypt.genSalt()
        let data = new UserModel(req.body)
        data.password = await bcrypt.hash(data.password, salt)
        await data.save()

        const token = req.headers.authorization
        const user = jwt.decode(token.slice(7))
        log(user._id, 1, 'User', req.body.login)

        res.status(201).json({ success: true })
    } catch (error) {
        res.status(400).json({ success: false, error })
    }
}

module.exports = {
    createUser,
    login,
    me,
    signup
}