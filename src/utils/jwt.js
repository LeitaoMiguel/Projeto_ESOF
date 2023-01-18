var jwt = require("jsonwebtoken");

exports.validateToken = (authorization) => {
    var errors = [];

    if(!authorization) {
        errors.push({ msg: 'No authorization' })
        throw errors;
    }

    const auth = (authorization).split(' ');

    if (auth[0] !== 'Bearer') {
        errors.push({ msg: 'No bearer' })
        throw errors;
    }

    var decoded;
    try {
        decoded = jwt.verify(auth[1], "lpi-secret-key");
    }
    catch(e) {
        errors.push({ msg: 'No auth' })
        throw errors;
    }
    
    return decoded;
}

exports.issueToken = (userId) => {
    return jwt.sign({ id: userId }, "lpi-secret-key", {
        expiresIn: 86400 // 24 hours
    });
}