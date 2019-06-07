const Report = require("../models/report");

exports.reports_get_all = (req, res, next) => {
    Report.find()
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
    const Report = new Report({
        _id: new mongoose.Types.ObjectId(),
        title: req.body.title,
        gravity: req.body.gravity,
        type: req.body.type,
        state: req.body.state,
        userEmail: req.body.userEmail,
        description: req.body.description
    });
    Report
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
    const id = req.body.reportId;
    Report.remove({_id: id})
        .exec()
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err});
        });
};