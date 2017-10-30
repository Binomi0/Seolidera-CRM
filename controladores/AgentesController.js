'use strict';

const Agentes = require('../modelos/agentesSchema');

module.exports = {

    find: function (params, callback) {
        Agentes.find(params, function (err, result) {
            if (err){
                return callback(err, null);
            }
            return callback(null, result)
        })
    },
    create: function (params, callback) {
        Agentes.create(params, function (err, clientes) {
            if (err){
                return callback(err, null);
            }
            return callback(null, clientes)
        })
    }
};
