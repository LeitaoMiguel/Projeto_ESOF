let user_service = require('../services/user.service');

const { validateToken } = require('../utils/jwt');

exports.user = [
    async (req, res, next) => {
        roleCheck(0, req, res, next)
    }
]

exports.mod = [
    async (req, res, next) => {
        roleCheck(1, req, res, next)
    }
]

exports.admin = [
    async (req, res, next) => {
        roleCheck(2, req, res, next)
    }
]

const roleCheck = async (minRole, req, res, next) => {
    let errors = [];
    
    var tokenPayload;
    try {
        tokenPayload = validateToken(req.headers.authorization);
    }
    catch(errors) {
        return res.status(400).json({ errors: errors });
    }

    var foundUser = await user_service.findById(tokenPayload.id)

    if(!foundUser) {
        errors.push({ msg: 'User doesnt exist' })
        return res.status(400).json({ errors: errors });
    }

    if(foundUser.role < minRole) {
        errors.push({ msg: 'No permission' })
        return res.status(400).json({ errors: errors });
    }

    req.tokenPayload = tokenPayload;

    next();
}