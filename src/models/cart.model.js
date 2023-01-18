var mongoose = require('mongoose')

const CartSchema  = new mongoose.Schema({
    products: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
                required: [true, 'Product ID needed']
            },
            quantity: {
                type: Number,
                default: 1
            }
        }
    ],
    modifiedOn: {
        type: Date,
        default: Date.now
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        unique: true
    }
})

const Cart = mongoose.model('Cart', CartSchema)

module.exports = Cart;