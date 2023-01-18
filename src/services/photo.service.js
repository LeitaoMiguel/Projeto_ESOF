let Photo = require('../models/photo.model');
var fs = require('fs');

exports.create = async(destination, filename) => {
    var folders = destination.split('/');
    var finalFolder = folders[folders.lenght];

    const newPhoto = new Photo({ folder: finalFolder, url: filename})

    try {
        await newPhoto.save();
        console.log("Sucessfully added a photo to the database.")
        return newPhoto._id;
    }
    catch (e) {
        if (e) {
            if(e.code === 11000)
                errors.push({ msg: 'Photo already exists' })

            errors.push({ msg: e.code })

            console.log(e);

            throw errors;
        }
    }
}

exports.getPath = async (id) => {
    console.log("KIOOOJKIGN FOR");
    console.log(id);

    console.log(await Photo.find({}));

    var photo = await Photo.findOne({"_id": id});
    if(photo)
        return photo.url;
    else
        return "unnamed";
};

exports.getFolder = async(id) => {
    var photo = await Photo.findOne({"_id": id});
    return photo.folder;
}