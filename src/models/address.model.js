var mongoose = require('mongoose')

const AddressSchema  = new mongoose.Schema({
    street: {
        type: String,
        default: null,
    },
    city: { 
        type: String,
        default: null,
    },
    state: {
        type: String,
        default: null,
    },
    country: { 
        type: String,
        default: null,
    },
    zip: {
        type: String,
        default: null,
    },
    full_name: {
        type: String,
        default: null,
    },
    user: { 
        type: mongoose.Schema.Types.ObjectId,
        default: null,
        ref: 'User'
    },
});

const Address = mongoose.model('Address', AddressSchema)

module.exports = Address;