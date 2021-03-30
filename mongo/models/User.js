const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    email: String,
    createdAt: String
}, { collation: { locale: 'en', strength: 2 } })

module.exports = mongoose.model('User', UserSchema)