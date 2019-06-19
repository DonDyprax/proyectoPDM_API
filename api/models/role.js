const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    rol: String
});

module.exports = mongoose.model('Role', roleSchema);