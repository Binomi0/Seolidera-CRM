'use strict';

const Clientes = require('../modelos/clientesSchema');

module.exports = {

    find: function (params, callback) {
        Clientes.find(params, function (err, result) {
            if (err){
                return callback(err, null);
            }
            return callback(null, result)
        }).populate('negocios').populate('tareas').populate('llamadas')
    },
    create: function (params, callback) {
        console.log('PArametros recibidos ', params);
        Clientes.create(params, function (err, usuarios) {
            console.log('Respuesta de crear cliente', usuarios);
            if (err){
                return callback(err, null);
            }
            return callback(null, usuarios)
        })
    },
    update: function (id, resource, body, callback) {
        console.log('Cliente ID:', id);
        console.log('resource:', resource);
        console.log('body:', body);
        Clientes.findOneAndUpdate({ '_id': id } , { $push: { [resource]: body }}, { new: true }, function (err, response) {
            if (err) {
                return callback(err,  null);
            }
            return callback(null, response)
        })
    },
    findResource: function (id, resource, callback) {
        if (id && resource) {
            Clientes.findOne({nombre: 'Crístian'}, function (err, result) {
                if (err) {
                    return callback(err,  null)
                }
                return callback(null,  result)
            }).populate(resource)
        }
    }
};