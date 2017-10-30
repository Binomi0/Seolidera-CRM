'use strict';

const mongoose = require('mongoose');

const UsuariosSchema = new mongoose.Schema({
    nombre: { type: String },
    apellidos: { type: String },
    fiscal: { type: String },
    telf: { type: String },
    alta: { type: Date, default: Date.now() },
    email: {type: String, lowercase: true },
    activo: { type: Boolean, default: false },
    dni: { type: String, unique: true },
    direccion: { type: String },
    direccion2: { type: String },
    poblacion: { type: String },
    provincia: { type: String },
    observaciones: { type: String },
    postal: { type: String },
    tipo: { type: String },
    grupo: { type: String },
    fuente: { type: String },
    esAdmin: { type: Boolean },
    buser: { type: String },
    bpasw: { type: String },
    pedidos: [{type: mongoose.Schema.Types.ObjectId, ref: 'PedidosSchema'}],
    llamadas: [{ type: mongoose.Schema.Types.ObjectId, ref: 'LlamadasSchema'}],
    negocios: [{ type: mongoose.Schema.Types.ObjectId, ref: 'NegociosSchema'}],
    tareas: [{ type: mongoose.Schema.Types.ObjectId, ref: 'TareasSchema'}]
});

module.exports = mongoose.model('Usuario', UsuariosSchema);