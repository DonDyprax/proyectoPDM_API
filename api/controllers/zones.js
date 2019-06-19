const mongoose = require('mongoose')
const Zone = require("../models/zone");

exports.zones_get_all = (req, res, next) => {
    Zone.find()
    .exec()
    .then(docs => {
        console.log(docs);
        if(docs.length > 0) {
            res.status(200).json(docs);
        } else {
            res.status(404).json({
                message: "No entries found"
            });
        }
        
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
};

exports.zones_create_zone = (req, res, next) => {
    var arrayLatitud = req.body.latitud.split(', ');
    var arrayLongitud = req.body.longitd.split(', ');

    const Zone = new Zone({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        arrayLat: arrayLatitud,
        arrayLng: arrayLongitud,
        edifice: req.body.edifice,
        level: req.body.level
    });
    Zone
        .save()
        .then(result => {
            console.log(result);
            res.status(200).json({
                message: 'Handling POST request to /zones',
                createdZone: result
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
    
};

exports.zones_get_zone = (req, res, next) => {
    const id = req.params.zoneId
    Zone.findById(id)
    .exec()
    .then(doc => {
        console.log(doc);
        if(doc) {
            res.status(200).json(doc);
        } else {
            res.status(404).json({
                message: "Zone not found for provided ID"
            })
        } 
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    });
};

exports.zones_delete_zone = (req, res, next) => {
    const id = req.body.zoneId;
    Zone.remove({_id: id})
        .exec()
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err});
        });
};