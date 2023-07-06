const express = require('express');
const mongoose = require("mongoose");
const Photo = require('../models/photo');
const router = express.Router();

// GET /photos. Dado un usuario obtiene todas sus fotos.
router.get('/:userName', (req, res) => {
  const { userName } = req.params;

  Photo.find({userName: userName}).then((data) => {
    res.status(200).json(data);
  }).catch((err) => {
    res.status(500).json({ err: 'Error interno del servidor' });
  });
});

// POST /photos. Dado un usuario, url de foto, titulo y descripción se debe guardar en la colección.
router.post('/', (req, res) => {
  const { userName, url, titulo, descripcion } = req.body;

  const foto = new Photo ({
    userName: userName,
    url: url,
    titulo: titulo,
    descripcion: descripcion
  });

  foto.save().then((data) => {
    res.status(201).json({ message: 'Foto añadida exitosamente' });
  }).catch((err) => {
    res.status(500).json({ err: 'Error interno del servidor' });
  });
});

// PUT /photos. Dado el titulo de una foto y una descripción modificar su descripción.
router.put('/:titulo', (req, res) => {
  const { titulo } = req.params;
  const { descripcion } = req.body;
  Photo.updateOne({ titulo: titulo }, { descripcion: descripcion }).then((data) => {
    res.status(200).json({ message: 'Descripción actualizada exitosamente' });
  }).catch((err) => {
    res.status(500).json({ err: 'Error interno del servidor' });
  });
});

// DEL /photos. Dado un usuario y un título de foto eliminar su foto.
router.delete('/:userName/:titulo', (req, res) => {
  const { userName, titulo } = req.params;

  Photo.deleteOne({ userName: userName, titulo: titulo }).then((data) => {
    res.status(200).json({ message: 'foto eliminada exitosamente' });
  }).catch((err) => {
    res.status(500).json({ err: 'Error interno del servidor' });
  });
});

// DEL /photos. Dado un usuario eliminar todas sus fotos.
router.delete('/:userName', (req, res) => {
  const { userName } = req.params;

  Photo.deleteMany({ userName: userName }).then((data) => {
    res.status(200).json({ message: 'fotos eliminadas exitosamente' });
  }).catch((err) =>{
    res.status(500).json({ err: 'Error interno del servidor' });
  });
});

module.exports = router;
