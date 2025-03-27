const express = require('express')
const path = require('path')
const rateLimit = require('express-rate-limit')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const mongoSchema = new mongoose.Schema({
    username: {
        type: String,
        required: false,
        unique: true
    },
    email: {
        type: String,
        required: false,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

const User = mongoose.model('User', mongoSchema)

mongoose.connect('mongodb://localhost:27017/Trybite')
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.error("MongoDB Connection Error:", err));

const app = express()

const logger = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    handler: ((req, res) => {
        res.status(429).send('Chill out!')
    })
})

app.use(logger, express.json(), express.urlencoded({ extended: true }), express.static('./frontend'))

app.get('/login', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, 'frontend', 'form.html'))
})

app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body
        const newUser = new User({
            email: email,
            password: await bcrypt.hash(password, 10)
        })

        await newUser.save();

        res.send('done!')
    } catch (error) {
        console.log(error);
        res.send('failed')
    }
})

app.listen(3000)