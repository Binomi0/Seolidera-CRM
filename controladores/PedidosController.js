'use strict';
const Pedidos = require('../modelos/pedidosSchema');

module.exports = {

    find: function (params, callback) {
        Pedidos.find(params, function (err, pedidos) {
            if (err){
                return callback(err, null);
            }

            return callback(null, pedidos)
        })
    },

    create: function (params, callback) {
        Pedidos.create(params, function (err, pedidos) {
            if (err){
                return callback(err, null);
            }

            return callback(null, pedidos)
        })
    }
};