var mongoose = require('mongoose')

const OrderSchema  = new mongoose.Schema(
    {
        number: {
            type: Number,
            unique: true
        },
        user: { 
            type: mongoose.Schema.Types.ObjectId,
            default: null,
            ref: 'User'
        },
        status: {
            type: String,
            default: null,
        },
        ship_to: { 
            type: mongoose.Schema.Types.ObjectId,
            default: null,
            ref: 'Address'
        },
    },
    { 
        toJSON: { getters: true } //this right here
    }
);

const Order = mongoose.model('Order', OrderSchema)

module.exports = Order;