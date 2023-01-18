var mongoose = require('mongoose')

const CategorySchema  = new mongoose.Schema({
    name: {
        type: String,
        unique: true
    },
    description: {
        type: String
    },
    url: {
        type: String,
        unique: true
    },
    parent: {
        type: mongoose.Schema.Types.ObjectId,
        default: null,
        ref: 'Category'
    },
    photo: {
        type: mongoose.Schema.Types.ObjectId,
        default: null,
        ref: 'Photo'
    },
})

const Category = mongoose.model('Category', CategorySchema)

module.exports = Category;