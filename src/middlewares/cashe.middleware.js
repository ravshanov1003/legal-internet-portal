const redis = require('redis')
const REDIS_PORT = process.env.REDIS_PORT || 6379
const client = redis.createClient(REDIS_PORT)


function cache(key) {
    return async(req, res, next) => {
        client.get(`'${key}'`, (err, data) => {
            if (err) throw err
            if (data !== null) {
                res.status(200).json(data)
            } else {
                next()
            }
        })
    }
}

module.exports = { cache }