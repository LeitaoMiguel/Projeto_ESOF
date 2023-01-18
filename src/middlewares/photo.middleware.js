let photo_service = require('../services/photo.service');

exports.addToDB = [
    async (req, res, next) => {
        if (!req.file) {
            console.log("No file upload");
        } else {
            var id = await photo_service.create(req.file.destination, req.file.filename);
            if(id)
                req.body.photo = id;
        }
  
        next();
    }
]