let Order = require('../models/order.model');
var fs = require('fs');

exports.create = async (params) => {
    const newOrder = new Order(params);
    newOrder.url = newOrder.name.replace(/\s/g, '-').toLowerCase();

    let errors = [];

    try {
        await newOrder.save();
        console.log("Sucessfully added a order to the database.")
    }
    catch (e) {
        if (e) {
            if(e.code === 11000)
                errors.push({ msg: 'Order already exists' })

            errors.push({ msg: e.code })

            console.log(e);

            throw errors;
        }
    }
};

exports.findAll = async () => {
    return await Order.find({});
};

exports.findOne = async (params) => {
    return await Order.findById(params.id);
};

exports.delete = async (params) => {
    return await Order.deleteOne({ _id: params.id });
};