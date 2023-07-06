const mongoose = require ("mongoose");

const photoSchema = new mongoose.Schema({
    userName: String,
    url: String,
    titulo: String,
    descripcion: String
});

const Photo = mongoose.model('Photo', photoSchema);

module.exports = Photo;
