'use strict';

const Usuarios = require('../modelos/usuariosSchema');

module.exports = {

    find: function (params, callback) {
        Usuarios.find(params, function (err, result) {
            if (err){
                return callback(err, null);
            }
            return callback(null, result)
        }).populate('_id')
    },
    create: function (params, callback) {
        Usuarios.create(params, function (err, usuarios) {
            if (err){
                return callback(err, null);
            }
            return callback(null, usuarios)
        })
    },
    update: function (id, body, callback) {
        Usuarios.findOneAndUpdate(id, body, {new: true}, function (err, response) {
            if (err) {
                return callback(err,  null);
            }
            return callback(null, response)
        })
    },
    findResource: function (resource, id, callback) {
        Usuarios.findOne({_id: id}, function (err, result) {
            if (err) {
                return callback(err,  null)
            }
            return callback(null,  result)
        }).populate(resource)
    }
};
