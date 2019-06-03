const Match = require("../models/match");

exports.matches_get_all = (req, res, next) => {
    Match.find()
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

exports.matches_create_match = (req, res, next) => {
    const match = new Match({
        _id: new mongoose.Types.ObjectId(),
        team1: req.body.team1,
        team2: req.body.team2,
        team1points: req.body.team1points,
        team2points: req.body.team2points,
        date: req.body.date,
        userId: req.body.user
    });
    match
        .save()
        .then(result => {
            console.log(result);
            res.status(200).json({
                message: 'Handling POST request to /matches',
                createdMatch: result
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
    
};

exports.matches_get_match = (req, res, next) => {
    const id = req.params.matchId
    Match.findById(id)
    .exec()
    .then(doc => {
        console.log(doc);
        if(doc) {
            res.status(200).json(doc);
        } else {
            res.status(404).json({
                message: "Match not found for provided ID"
            })
        } 
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    });
};

exports.matches_delete_match = (req, res, next) => {
    const id = req.body.matchId;
    Match.remove({_id: id})
        .exec()
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err});
        });
};