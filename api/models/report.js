const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    danger: String,
    type: String,
    status: String,
    mailUser: String,
    image: String,
    description: String,
    lat: Number,
    ltn: Number,
    idZone: {type: mongoose.Schema.Types.ObjectId, ref:"Zone"},
    level: Number
});

module.exports = mongoose.model('Report', reportSchema);