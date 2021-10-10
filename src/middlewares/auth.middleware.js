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

function checkPermission(...roles) {
    return async(req, res, next) => {
        if (!roles.includes(req.user.userType))
            return res.status(403).json({
                success: false,
                error: `${req.user.userType} don't have permission`
            })
        next()
    }
}

module.exports = {
    protect: checkUser,
    checkPermission
}