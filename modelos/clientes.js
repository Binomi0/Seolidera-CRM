'use strict';

const mongoose = require('mongoose');
const Negocio = require('./negocios');
const Llamada = require('./llamadas');
const Pedido = require('./pedidos');
const Tarea = require('./tareas');

const ClientesSchema = new mongoose.Schema({
    nombre: { type: String },
    apellidos: { type: String },
    fiscal: { type: String },
    telf: { type: String },
    alta: { type: Date, default: Date.now() },
    email: {type: String, unique: true, lowercase: true },
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
    pedidos: [{type: mongoose.Schema.Types.ObjectId, ref: 'Pedido'}],
    llamadas: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Llamada'}],
    negocios: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Negocio'}],
    tareas: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tarea'}]
});

module.exports = mongoose.model('Cliente', ClientesSchema);