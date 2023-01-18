var mongoose = require('mongoose')

const RateSchema  = new mongoose.Schema({
    message: {
        type: String,
    },
    rate: {
        type: Number,
    }
})

const Rate = mongoose.model('Rate', RateSchema)

module.exports = Rate;