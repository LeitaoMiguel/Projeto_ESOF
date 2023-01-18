const rate_service = require('../services/rate.service');

exports.findAll = async(req, res, next) => {
    try {
        const data = await rate_service.findAll();
        res.status(200).send(data);
        next();
    } catch(error) {
        console.log(error.message);
        res.sendStatus(500) && next(error);
    }
};

exports.findOne = async(req, res, next) => {
    const params = req.params;
    
    try {
        const data = await rate_service.findOne(params);
        res.status(200).send(data);
        next();
    } catch(error) {
        console.log(error.message);
        res.sendStatus(500) && next(error);
    }
};

exports.delete = async(req, res, next) => {
    const params = req.params;
    
    try {
        const data = await rate_service.delete(params);
        res.status(200).send(data);
        next();
    } catch(error) {
        console.log(error.message);
        res.sendStatus(500) && next(error);
    }
};

exports.deleteAll = async(req, res, next) => {
    try {
        const data = await rate_service.deleteAll();
        res.status(200).send(data);
        next();
    } catch(error) {
        console.log(error.message);
        res.sendStatus(500) && next(error);
    }
};