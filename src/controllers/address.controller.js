const address_service = require('../services/address.service');

exports.create = async(req, res, next) => {
    const data = req.body;

    try {
        await address_service.create(data);
        res.status(200).send({ status: 'OK'});
        next();
    } catch(errors) {
        return res.status(400).json({ errors: errors });
    }
};

exports.findAll = async(req, res, next) => {
    try {
        const data = await address_service.findAll();
        setTimeout((() => {
            res.status(200).send(data);
            next();
        }), 0)
    } catch(error) {
        console.log(error.message);
        res.sendStatus(500) && next(error);
    }
};

exports.findOne = async(req, res, next) => {
    const id = req.params.id;

    try {
        const data = await address_service.findById(id);
        setTimeout((() => {
            res.status(200).send(data);
            next();
        }), 0)
    } catch(error) {
        console.log(error.message);
        res.sendStatus(500) && next(error);
    }
};

exports.delete = async(req, res, next) => {
    const params = req.params;
    
    try {
        const data = await address_service.delete(params);
        res.status(200).send(data);
        next();
    } catch(error) {
        console.log(error.message);
        res.sendStatus(500) && next(error);
    }
};