'use strict';

const mongoose = require('mongoose');
const Cliente = require('./clientesSchema');

const TareasSchema = new mongoose.Schema({
    cliente: { type: mongoose.Schema.Types.ObjectId, ref: 'Cliente' },
    titulo: { type: String },
    fecha_inicio: { type: Date, default: Date.now()},
    fecha_fin: { type: Date, default: Date.now()},
    agente: { type: String },
    responsable: { type: String },
    estado: {type: String },
    descripcion: { type: String }
});

TareasSchema.pre('save', function (next) {
    console.log('TERMINADA: ', this.terminada);
    if (!this.terminada) {
        this.terminada = 'No'
    } else {
        this.terminada = 'Si'

    }
    next();
});

module.exports = mongoose.model('Tarea', TareasSchema);