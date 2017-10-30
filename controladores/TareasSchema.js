'use strict';

const Tareas = require('../modelos/tareas');

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
    }
};