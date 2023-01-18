let User = require('../models/user.model');

exports.findAll = async (query, page, limit) => {
    try {
        var users = await User.find(query)
        return users;
    } catch (e) {
        // Log Errors
        throw Error('Error while Paginating Users')
    }
};

exports.findById = async (id) => {
    return await User.findById(id);
};

exports.update = async (id, data) => {
    console.log("UPDATIN USER DATA")
    console.log(data);
    console.log(id)

    try {
        await User.findByIdAndUpdate(id, data);
    } catch (e) {
        if (e) {
            console.log(e);
            errors.push({ msg: e })
            throw errors;
        }
    }
};

exports.delete = async (id) => {
    return await User.deleteOne({ _id: id });
};

exports.getUserPhotoPathById = async (id) => {
    var user = await User.findOne({"_id": id});

    console.log("USERING")
    console.log(user.name)

    return user.photo_path;
};