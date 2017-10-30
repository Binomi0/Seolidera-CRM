'use strict';

const mongoose = require('mongoose');
const Cliente = require('./clientes');

const TareasSchema = new mongoose.Schema({
    cliente: { type: mongoose.Schema.Types.ObjectId, ref: 'Cliente' },
    fecha_venta: { type: Date, default: Date.now()},
    asunto: {type: String },
    propietario: { type: String },
    cuenta: { type: String },
    descripcion: { type: String }
});

module.exports = mongoose.model('Tarea', TareasSchema);