const order_service = require('../services/order.service');

exports.create = async(req, res, next) => {
    var params = req.body;

    if (!req.file) {
        console.log("No file upload");
    } else {
        params.photo_path = req.file.filename;
    }

    try {
        await order_service.create(params);
        res.status(200).send({ status: 'OK'});
        next();
    } catch(errors) {
        return res.status(400).json({ errors: errors });
    }
};

exports.findAll = async(req, res, next) => {
    try {
        const data = await order_service.findAll();
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
        const data = await order_service.findOne(params);
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
        const data = await order_service.delete(params);
        res.status(200).send(data);
        next();
    } catch(error) {
        console.log(error.message);
        res.sendStatus(500) && next(error);
    }
};

exports.update = async(req, res, next) => {
    const params = req.params;
    
    try {
        const data = await order_service.update(params);
        res.status(200).send(data);
        next();
    } catch(errors) {
        return res.status(400).json({ errors: errors });
    }
};