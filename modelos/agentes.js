'use strict';

const mongoose = require('mongoose');

const AgentesSchema = new mongoose.Schema({
    nombre: { type: String },
    apellidos: { type: String },
    telf: { type: String },
    fechaAlta: { type: Date, default: Date.now() },
    activo: { type: Boolean },
    dni: { type: String, unique: true },
    direccion: { type: String },
    tipo: { type: String },
    grupo: { type: String }
});

module.exports = mongoose.model('Agente', AgentesSchema);