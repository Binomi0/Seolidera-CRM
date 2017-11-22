'use strict';

const mongoose = require('mongoose');

const ProspectosSchema = new mongoose.Schema({
    nombre: { type: String },
    fecha: { type: Date, default: Date.now() },
    email: {type: String, lowercase: true },
    agente: { type: String },
});

module.exports = mongoose.model('Prospectos', ProspectosSchema);