const mongoose = require('mongoose')

const mongoSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
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

function mongooseConnect() {
    mongoose.connect('mongodb://localhost:27017/Trybite')
        .then(() => console.log("✅ Connected to MongoDB successfully!"))
        .catch(err => console.error("❌ MongoDB Connection Error:", err));
}

module.exports = { mongoSchema, User, mongooseConnect }