var path = require('path')

const category_service = require('../services/category.service');
const photo_service = require('../services/photo.service');

exports.create = async(req, res, next) => {
    const data = req.body;

    console.log("PHOTO");
    console.log(data.photo);
    console.log("ENDPHOTO");

    try {
        await category_service.create(data);
        res.status(200).send({ status: 'OK'});
        next();
    } catch(errors) {
        return res.status(400).json({ errors: errors });
    }
};

exports.findAll = async(req, res, next) => {
    const query = req.query;

    try {
        const data = await category_service.findAll(query);
        res.status(200).send(data);
        next();
    } catch(error) {
        console.log(error.message);
        res.sendStatus(500) && next(error);
    }
};

exports.findOne = async(req, res, next) => {
    const id = req.params.id;

    try {
        const data = await category_service.findById(id);
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
        const data = await category_service.delete(params);
        res.status(200).send(data);
        next();
    } catch(error) {
        console.log(error.message);
        res.sendStatus(500) && next(error);
    }
};

exports.getPhoto = async(req, res, next) => {
    var categoryId = req.params.categoryId;
    
    var category = await category_service.findById(categoryId);

    if(category) {
        if(category.photo) {
            var photoId = category.photo;
    
            var photoPath = (await photo_service.getPath(photoId));
        
            let indexPath = path.join(__dirname, `../../uploads/categories/${photoPath}`);
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