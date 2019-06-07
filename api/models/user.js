const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    password: String,
    sex: String,
    email: {type: String, unique: true},
    role: String,
    reports: [{type: mongoose.Schema.Types.ObjectId, ref: 'Report'}]
});

module.exports = mongoose.model('User', userSchema);