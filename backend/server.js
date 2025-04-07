const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const rateLimit = require('express-rate-limit')
const rateLimiter = require('./modules/rate-limiter')
const { mongooseConnect } = require('./modules/mongo-user')
require('dotenv').config()

mongooseConnect()

const app = express()

app.use(logger, express.json(), express.urlencoded({ extended: true }), express.static(path.join(__dirname)))

app.get('/login', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, 'frontend', 'src', 'pages', 'form.html'))
})

app.post('/usernameValidator', async (req, res) => {
    let { username } = req.body
    username = username.toLowerCase()
    console.log(req.body);

    const isFound = await User.findOne({ username })
    if (isFound) {
        return res.status(409).send('Username already taken!')
    }
    res.status(200).send('Username valid!')
})

app.post('/emailValidator', async (req, res) => {
    let { email } = req.body
    email = email.toLowerCase()
    console.log(req.body);

    const isFound = await User.findOne({ email })
    if (isFound) {
        return res.status(409).send('Email already in use!')
    }
    res.status(200).send('Email valid!')
})

app.post('/login', async (req, res) => {
    try {
        const { username, email, password } = req.body
        const newUser = new User({
            username: username,
            email: email,
            password: await bcrypt.hash(password, 10)
        })

        await newUser.save();
    } catch (error) {
        console.log(error);
        res.send('An error occurred in our system, please try again later!')
    }
})

app.listen(process.env.PORT, () => {
    console.log(`✅ Localhost server running on port: http://localhost:${process.env.PORT}/login`);
})
