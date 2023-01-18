let Cart = require('../models/cart.model');
let Product = require('../models/product.model');
var fs = require('fs');

exports.addProductToCart = async (data) => {
    var errors = [];

    console.log("TENTATIVA DE ADICIONAR AO CARRINHO")
    console.log(data);

    var foundCarts = await Cart.find({ user: data.userId });

    console.log(foundCarts);

    if(foundCarts.length == 0) {
        newCart = await this.createCart(data.userId);
        foundCarts.push(newCart);
    }

    var index = null;
    foundCarts[0].products.forEach((e, i) => {
        if(e.product == data.productId) {
            index = i;
        }
    })

    if(index != null) {
        foundCarts[0].products[index].quantity += parseInt(data.quantity);
    }
    else {
        var newProduct = { product: data.productId, quantity: data.quantity };
        foundCarts[0].products.push(newProduct);
    }

    try {
        await foundCarts[0].save();
        console.log("Sucessfully added/updated a product to/from the cart")
    }
    catch(error) {
        errors.push({ msg: "Error trying to save cart" })
        throw errors;
    }
};

exports.removeEntryFromCart = async (data) => {
    var errors = [];
    try {
        return await Cart.updateOne( 
            { user: data.userId },
            {
                $pull: {
                    products: { product : data.productId }
                }
            },
            { safe: true }
        );
    }
    catch(error) {
        errors.push({ msg: "error" })
        throw errors;
    }
};

exports.updateEntryOnCart = async (data) => {
    return await Cart.updateOne(
        { user: data.userId, "products.product": data.productId },
        {
            $set: {
                "products.$.quantity": data.quantity
             }
        }
    )
};

exports.createCart = async (ownerId) => {
    var errors = [];

    const newCart = new Cart({ user: ownerId });

    try {
        await newCart.save();
        console.log("Sucessfully added a new cart to the database.")
        return newCart;
    }
    catch (e) {
        if (e) {
            if(e.code === 11000)
                errors.push({ msg: 'Cart already exists' })

            errors.push({ msg: e.code })
            throw errors;
        }
        errors.push({ msg: "Unexpected error" })
        throw errors;
    }
};

exports.findAll = async (query) => {
    var errors = [];
    try {
        return await Cart.find(query);
    }
    catch(error) {
        errors.push({ msg: "error" })
        throw errors;
    }
};

exports.findById = async (id) => {
    var errors = [];
    try {
        return await Cart.findById(id);
    }
    catch(error) {
        errors.push({ msg: "error" })
        throw errors;
    }
};

exports.findByUserId = async (userId) => {
    var errors = [];
    try {
        return await Cart.findOne({ user: userId }).populate({ path: 'products.product' });
    }
    catch(error) {
        errors.push({ msg: "error" })
        throw errors;
    }
};

exports.deleteCart = async (id) => {
    var errors = [];
    try {
        return await Cart.deleteOne({ _id: id });
    }
    catch(error) {
        errors.push({ msg: "error" })
        throw errors;
    }
};

exports.deleteCartByUserId = async (userId) => {
    var errors = [];
    try {
        return await Cart.deleteOne({ user: userId });
    }
    catch(error) {
        errors.push({ msg: "error" })
        throw errors;
    }
};