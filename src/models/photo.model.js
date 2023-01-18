var mongoose = require('mongoose')

const PhotoSchema  = new mongoose.Schema({
    url: {
        type: String,
        unique: true
    },
    folder: {
        type: String
    },
})

const Photo = mongoose.model('Photo', PhotoSchema)

module.exports = Photo;