const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema({
    body: String,
    username: String,
    createdAt: String,
    comments: [
        {body: String, username: String, createdAt: String, user: {type: mongoose.Schema.Types.ObjectId, ref: 'users'}}
    ],
    likes: [
        {username: String, createdAt: String, user: {type: mongoose.Schema.Types.ObjectId, ref: 'users'}}
    ],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

module.exports = mongoose.model('Post', PostSchema)