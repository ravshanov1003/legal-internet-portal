const jwt = require('jsonwebtoken')

const { UserModel } = require('../models/user.model')

async function checkUser(req, res, next) {
    const { authorization } = req.headers;

    if (authorization && authorization.startsWith('Bearer')) {
        token = authorization.split(" ")[1]
        if (!token) {
            res.status(401).json({
                success: false,
                message: 'Auth error'
            })
        }
        let decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = await UserModel.findOne({ _id: decoded._id })
        next();
    } else {
        res.status(401).json({
            success: false,
            message: 'Unauthorized'
        })
    }
}



module.exports = {
    protect: checkUser
}