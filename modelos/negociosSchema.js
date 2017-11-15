'use strict';

const mongoose = require('mongoose');

const NegociosSchema = new mongoose.Schema({
    cliente: { type: mongoose.Schema.Types.ObjectId, ref: 'Cliente' },
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
    pagado: { type: Boolean },
    fecha_pago: { type: Date },
    horario: [{ type: String }],
    oportunidades: { type: String },
    descripcion: { type: String },
    producto: { type: String },
    redes: [{ type: String}],
    fotos: [{ type: mongoose.Schema.Types.Mixed }],
    frases: [{ type: String }],
    activa: { type: Boolean },
    estado: { type: String },
    agente: { type: String },
});

// TODO (actualizar el usuario business unicamente si es cliente nuevo)

NegociosSchema.pre('save', function (next) {
    console.log('Ejecutando antes de guardar, doc:', this);
    let fecha = new Date();
    let renovar = fecha.setMonth(fecha.getMonth() + this.renovacion);
    console.log(renovar);
    this.renovar = renovar;

    console.log('Ejecutando antes de guardar');
    next();
});
// FIXME algo

module.exports = mongoose.model('Negocio', NegociosSchema);