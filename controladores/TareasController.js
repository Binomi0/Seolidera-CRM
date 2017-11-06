'use strict';

const Tareas = require('../modelos/tareasSchema');

module.exports = {

    find: function (params, callback) {
        Tareas.find(params, function (err, result) {
            if (err){
                return callback(err, null);
            }
            return callback(null, result)
        })
    },

    create: function (params, callback) {
        Tareas.create(params, function (err, tareas) {
            if (err){
                return callback(err, null);
            }
            return callback(null, tareas)
        })
    },
    update: function (id, body, callback) {
        Tareas.findOneAndUpdate({ '_id': id },  body, { new: true }, function (err, llamada) {
            if (err) {
                return callback(err, null)
            }
            return callback(null, llamada)
        })
    },
    delete: function (id, callback) {
        let ok = false;
        Tareas.findByIdAndRemove({ '_id': id}).then(() => {
            ok = true;
            return callback(null, ok)
        }).catch(err => {
            ok = false;
            return callback(err, ok)
        });
    }
};