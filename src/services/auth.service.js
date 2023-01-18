let User = require('../models/user.model');

const { issueToken } = require('../utils/jwt')

var bcrypt = require("bcryptjs");

exports.signup = async (content) => {
    const newUser = new User(content);
    newUser.password = bcrypt.hashSync(newUser.password, 8)

    //console.log(newUser);

    let errors = [];

    try {
        await newUser.save();
        console.log("Sucessfully added a user to the database.")
    }
    catch (e) {
        if (e && e.code === 11000) {
            errors.push({ msg: 'User already exists' })
            throw errors;
        }
    }
};

exports.login = async (content) => {
    let errors = [];

    const foundUser = await User.findOne({
        email: content.email
    })
    
    if(!foundUser) {
        errors.push({ msg: 'User does not exists' })
        throw errors;
    }

    try {
        var passwordMatch = bcrypt.compareSync(content.password, foundUser.password);
    }
    catch(e)
    {
        console.log(e);
    }

    if(!passwordMatch) {
        errors.push({ msg: "Password don't match" })
        throw errors;
    }
    
    var token = issueToken(foundUser._id);

    var return_data = {
        id: foundUser._id,
        email: foundUser.email,
        accessToken: token
    }

    console.log(return_data);

    return return_data;

    //console.log(foundUser);
};