let Product = require('../models/product.model');

const rate_service = require('./rate.service');

var fs = require('fs');

const mongoose = require('mongoose');

exports.create = async (params) => {
    const newProduct = new Product(params);
    newProduct.url = newProduct.name.replace(/\s/g, '-').toLowerCase();

    console.log(params);

    let errors = [];

    try {
        await newProduct.save();
        console.log("Sucessfully added a product to the database.")
    }
    catch (e) {
        if (e) {
            if(e.code === 11000)
                errors.push({ msg: 'Product already exists' })

            errors.push({ msg: e.code })

            throw errors;
        }
    }
};

exports.findAll = async (query) => {
    var lastQuery = {};

    if(query.ids)
        lastQuery['_id'] = { $in: query.ids.split(',')};
    if(query.category)
        lastQuery['category'] = query.category;

    return await Product.find(lastQuery).populate("category");
};

exports.findById = async (id) => {
    return await Product.findById(id).populate("category").populate("rates");
};

/*
exports.findById = async (ids) => {
    var idArray = [];
    
    console.log(ids);

    ids.forEach((id) => {
        idArray.push(mongoose.Types.ObjectId(id));
    })

    return await Product.find({ '_id': { $in: idArray} });
};*/

exports.delete = async (params) => {
    return await Product.deleteOne({ _id: params.id });
};

exports.deleteAll = async (params) => {
    return await Product.deleteMany({});
};

exports.addRating = async (body, productId) => {
    var product = await Product.findById(productId);

    var id = await rate_service.addRating(body, productId);

    product.rates.push(id);

    product.save();
};