const mongoose = require('mongoose');

const matchSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    team1: String,
    team2: String,
    team1Points: Number,
    team2Points: Number,
    date: Date,
    userId: mongoose.Schema.Types.ObjectId
});

module.exports = mongoose.model('Match', matchSchema);