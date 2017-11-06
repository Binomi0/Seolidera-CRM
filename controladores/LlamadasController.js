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
    },
    update: function (id, body, callback) {
        Llamadas.findOneAndUpdate({ '_id': id },  body, { new: true }, function (err, llamada) {
            if (err) {
                return callback(err, null)
            }
            return callback(null, llamada)
        })
    },
    delete: function (id, callback) {
        let ok = false;
        Llamadas.findByIdAndRemove({ '_id': id}).then(() => {
            ok = true;
            return callback(null, ok)
        }).catch(err => {
            ok = false;
            return callback(err, ok)
        });
    }
};