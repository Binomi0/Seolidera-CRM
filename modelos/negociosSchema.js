'use strict';

const mongoose = require('mongoose');

const NegociosSchema = new mongoose.Schema({
    cliente: { type: String },
    alta: { type: Date, default: Date.now()},
    renovacion: { type: Number, min: 1, max: 12 },
    renovar: { type: Date },
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
    fotos: [],
    ficha_actualizada: { type: Boolean },
    estado: { type: String }
});

NegociosSchema.pre('save', function (next) {
    console.log('Ejecutando antes de guardar, doc:', this);
    let fecha = new Date();
    let renovar = fecha.setMonth(fecha.getMonth() + this.renovacion);
    console.log(renovar);
    this.renovar = renovar;

    console.log('Ejecutando antes de guardar');
    next();
});

module.exports = mongoose.model('Negocio', NegociosSchema);