const mongoose = require('mongoose')
const Report = require("../models/report");

exports.reports_get_all = (req, res, next) => {
    Report.find()
    .populate('idZone')
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

exports.reports_create_report = (req, res, next) => {
    const newReport = new Report({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        danger: req.body.danger,
        type: req.body.type,
        status: req.body.status,
        mailUser: req.body.mailUser,
        image: req.body.image,
        description: req.body.description,
        lat: req.body.lat,
        ltn: req.body.ltn,
        idZone: req.body.idZone,
        level: req.body.level
    });
    newReport
        .save()
        .then(result => {
            console.log(result);
            res.status(200).json({
                message: 'Handling POST request to /reportes',
                createdReport: result
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
    
};

exports.reports_get_report = (req, res, next) => {
    const id = req.params.reportId
    Report.findById(id)
    .exec()
    .then(doc => {
        console.log(doc);
        if(doc) {
            res.status(200).json(doc);
        } else {
            res.status(404).json({
                message: "Report not found for provided ID"
            })
        } 
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    });
};

exports.reports_delete_report = (req, res, next) => {
    const id = req.params.reportId;
    Report.deleteOne({_id: id})
        .exec()
        .then(result => {
            //res.status(200).json(result);
            res.redirect('/');
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err});
        });
};