const express = require('express')
const path = require('path')
const rateLimit = require('express-rate-limit')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
require('dotenv').config()

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
    .then(() => console.log("✅ Connected to MongoDB successfully!"))
    .catch(err => console.error("❌ MongoDB Connection Error:", err));

const app = express()

const logger = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    handler: ((req, res) => {
        res.status(429).send('Chill out!')
    })
})

app.use(logger, express.json(), express.urlencoded({ extended: true }), express.static(path.join(__dirname)))

app.get('/login', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, 'frontend', 'src', 'pages', 'form.html'))
})

app.post('/usernameValidator', async (req, res) => {
    const { username } = req.body
    console.log(req.body);

    const isFound = await User.findOne({ username })
    if (isFound) {
        return res.status(409).send('Username already taken!')
    }
    res.status(200).send('Username valid!')
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

app.listen(process.env.PORT, () => {
    console.log(`✅ Localhost server running on port: http://localhost:${process.env.PORT}`);
})
