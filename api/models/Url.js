const mongoose = require('mongoose')

// Create URL schema
const urlSchema = mongoose.Schema({
    slug: {
        type: String,
        required: true
    },
    longUrl: {
        type: String,
        required: true
    },
    shortUrl: {
        type: String,
        required: true
    },
    createdAt: {
        type: String,
        default: Date.now
    }
})

module.exports = mongoose.model('urlModel', urlSchema)