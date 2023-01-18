let Rate = require('../models/rate.model');

exports.addRating = async (body, productId) => {
    const newRating = new Rate(body);

    let errors = [];

    try {
        await newRating.save();
        console.log("Sucessfully added a rating to the database.")
    }
    catch (e) {
        if (e) {
            errors.push({ msg: e.code })
            throw errors;
        }
    }

    return newRating._id;
};

exports.findAll = async () => {
    return await Rate.find({});
};

exports.findOne = async (params) => {
    return await Rate.findById(params.id);
};

exports.delete = async (params) => {
    return await Rate.deleteOne({ _id: params.id });
};

exports.deleteAll = async () => {
    return await Rate.deleteMany({});
};