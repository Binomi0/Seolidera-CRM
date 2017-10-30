'use strict';

const mongoose = require('mongoose');

const NegociosSchema = new mongoose.Schema({
    cliente: { type: String },
    alta: { type: Date, default: Date.now()},
    nombre: {type: String },
    pais: { type: String },
    direccion: { type: String },
    postal: { type: String },
    ciudad: { type: String },
    provincia: { type: String },
    tlf: { type: String },
    categoria: { type: String },
    web: { type: String },
    horario: { type: String },
    redes: [],
    frases: [],
    fotos: []
});

module.exports = mongoose.model('Negocio', NegociosSchema);