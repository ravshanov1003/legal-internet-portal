const redis = require('redis')
const NodeCache = require("node-cache");

const REDIS_PORT = process.env.REDIS_PORT || 6379
const client = redis.createClient(REDIS_PORT)

const myCache = new NodeCache({ stdTTL: 100, checkperiod: 120 });

function cache(key) {
    return async(req, res, next) => {
        client.on("error", (err) => {
            console.log(err);
        });
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

// function nodeCache(key) {
//     return async(req, res, next) => {
//         if (myCache.has(`${key}`)) {
//             console.log('getting it from cache')
//             return res.status(200).json(myCache.get(`${key}`))
//         } else next()
//     }
// }

module.exports = { cache }