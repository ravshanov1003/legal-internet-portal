const Log = require('../models/log.model')
const { UserModel } = require('../models/user.model')

async function createLog(user, action, category, product) {
    try {
        const candidate = await UserModel.findOne({ _id: user })
        const log = new Log({
            user: candidate.login,
            action,
            category,
            product
        })
        log.save()
        console.log('success')
    } catch (error) {
        console.log(error)
    }
}

module.exports = { createLog }