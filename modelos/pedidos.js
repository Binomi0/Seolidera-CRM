'use strict';

const mongoose = require('mongoose');

const PedidosSchema = new mongoose.Schema({
    cliente: { type: String },
    fecha_venta: { type: Date, default: Date.now()},
    producto: {type: String },
    precio: { type: Number }
});

module.exports = mongoose.model('Pedido', PedidosSchema);