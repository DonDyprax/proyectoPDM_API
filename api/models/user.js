const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    password: String,
    gender: String,
    mail: {type: String, unique: true},
    idRol: {type: mongoose.Schema.Types.ObjectId, ref:'Role'}
});

module.exports = mongoose.model('User', userSchema);