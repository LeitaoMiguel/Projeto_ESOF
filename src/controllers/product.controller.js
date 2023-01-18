var path = require('path')

const product_service = require('../services/product.service');
const photo_service = require('../services/photo.service');

exports.create = async(req, res, next) => {
    var body = req.body;

    try {
        await product_service.create(body);
        res.status(200).send({ status: 'OK'});
        next();
    } catch(errors) {
        return res.status(400).json({ errors: errors });
    }
};

exports.findAll = async(req, res, next) => {
    const query = req.query;

    console.log("QUERY");
    console.log(query);

    try {
        const data = await product_service.findAll(query);

        console.log(data);
        console.log("returning data");

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
        const data = await product_service.findById(params.id);
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
        const data = await product_service.delete(params);
        res.status(200).send(data);
        next();
    } catch(error) {
        console.log(error.message);
        res.sendStatus(500) && next(error);
    }
};

exports.deleteAll = async(req, res, next) => {
    try {
        const data = await product_service.deleteAll();
        res.status(200).send(data);
        next();
    } catch(error) {
        console.log(error.message);
        res.sendStatus(500) && next(error);
    }
};

exports.getPhoto = async(req, res, next) => {
    var productId = req.params.productId;
    
    var product = await product_service.findById(productId);

    if(product) {
        if(product.photo) {
            var photoId = product.photo;
    
            var photoPath = (await photo_service.getPath(photoId));
        
            let indexPath = path.join(__dirname, `../../uploads/products/${photoPath}`);
            res.sendFile(indexPath);
        }
        else {
            res.sendStatus(500) && next();
        }
    }
    else {
        res.sendStatus(500) && next();
    }
}

exports.addRating = async(req, res, next) => {
    var body = req.body;
    var productId = req.params.productId;

    console.log(body);

    try {
        await product_service.addRating(body, productId);

        res.status(200).send({ status: 'OK'});
        next();
    } catch(errors) {
        return res.status(400).json({ errors: errors });
    }
}

exports.getRatings = async(req, res, next) => {
    var body = req.body;
    var productId = req.params.productId;

    try {
        res.status(200).send({ status: 'OK'});
        next();
    } catch(errors) {
        return res.status(400).json({ errors: errors });
    }
}

