const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken")

const { UserModel } = require('../models/user.model')

async function login(req, res) {
    const { username, password } = req.body;
    try {
        const user = await UserModel.findOne({ username });
        if (!user) {
            res.status(400).send({
                message: "User not found",
            });
        } else {
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                res.status(400).send({
                    message: "Password is incorrect",
                });
            } else {
                const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
                    expiresIn: "1d",
                });
                res.status(200).send({
                    token: token
                })
            }

        }
    } catch (error) {}
}

module.exports = {
    login
}