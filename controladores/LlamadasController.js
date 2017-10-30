'use strict';

const Llamadas = require('../modelos/llamadasSchema');

module.exports = {

    find: function (params, callback) {
        Llamadas.find(params, function (err, result) {
            if (err){
                return callback(err, null);
            }
            return callback(null, result)
        })
    },

    create: function (params, callback) {
        console.log('create: params:', params)
        Llamadas.create(params, function (err, llamadas) {
            console.log('create: llamadas:', llamadas)
            if (err){
                console.log('err:', err)
                return callback(err, null);
            }
            return callback(null, llamadas)
        })
    }
};