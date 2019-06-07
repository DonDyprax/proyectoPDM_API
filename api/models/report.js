const mongoose = require('mongoose');

const reportSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: String,
    gravity: Number,
    type: String,
    state: Number,
    userEmail: String,
    description: String
});

module.exports = mongoose.model('Report', reportSchema);