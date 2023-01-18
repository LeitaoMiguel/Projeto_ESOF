const cart_service = require('../services/cart.service');

exports.findOne = async(req, res, next) => {
    const params = req.params;
    
    try {
        const data = await cart_service.findOne(params.id);
        res.status(200).send(data);
        next();
    } catch(error) {
        console.log(error.message);
        res.sendStatus(500) && next(error);
    }
};

exports.findAll = async(req, res, next) => {
    const query = req.query;

    try {
        const data = await cart_service.findAll(query);
        res.status(200).send(data);
        next();
    } catch(errors) {
        return res.status(400).json({ errors: errors });
    }
};

exports.delete = async(req, res, next) => {
    const params = req.params;
    
    try {
        const data = await cart_service.deleteCart(params.id);
        res.status(200).send(data);
        next();
    } catch(error) {
        console.log(error.message);
        res.sendStatus(500) && next(error);
    }
};