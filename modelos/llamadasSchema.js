'use strict';

const mongoose = require('mongoose');

const LlamadasSchema = new mongoose.Schema({
    cliente: { type: mongoose.Schema.Types.ObjectId, ref: 'Cliente' },
    producto: { type: String },
    tlf: { type: String },
    agente: { type: String },
    objetivo: { type: String },
    asunto: { type: String },
    fecha: { type: Date, default: Date.now() },
    descripcion: { type: String },
    tipo: { type: String },
    cuenta: { type: String },
    estado: { type: String }
});

module.exports = mongoose.model('Llamada', LlamadasSchema);