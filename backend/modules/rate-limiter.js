const rateLimit = require('express-rate-limit')

const rateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    handler: ((req, res) => {
        res.status(429).send('Chill out!')
    })
})

module.exports = rateLimiter