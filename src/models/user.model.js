const jwt = require('jsonwebtoken')

const { model, Schema, Types } = require('mongoose')

const schema = new Schema({
    login: {
        unique: true,
        required: true,
        type: String,
        minlength: 5,
        maxlength: 15,
        trim: true,
        lowercase: true
    },
    email: {
        unique: true,
        required: true,
        type: String,
        minlength: 8,
        maxlength: 50,
        trim: true,
        lowercase: true
    },
    fullName: {
        required: true,
        type: String,
        minlength: 3,
        maxlength: 50
    },
    password: {
        required: true,
        type: String,
        select: false,
        minlength: 8
    },
    userType: {
        type: String,
        enum: ['admin', 'moderator', 'user'],
        default: 'admin',
        select: true
    }
}, { timestamps: true, collection: 'users' })


schema.methods.generateAuthToken = function() {
    return jwt.sign({ _id: this._id, userType: this.userType },
        process.env.JWT_SECRET, { expiresIn: '7d' } // 1 week
    )
}


module.exports = { UserModel: model('User', schema) }