const mongoose = require('mongoose');

const zoneSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    arrayLat: [{type: String}],
    arrayLng: [{type: String}],
    building: Number,
    level: Number
});

module.exports = mongoose.model('Zone', zoneSchema);