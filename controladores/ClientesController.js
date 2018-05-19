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
    updateItem: function (id, resource, body, callback) {
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
    update: function (id, body, callback) {
        console.log('Cliente ID:', id);
        console.log('body:', body);
        Clientes.findOneAndUpdate({ '_id': id } , body , { new: true }, function (err, response) {
            if (err) {
                return callback(err,  null);
            }
            return callback(null, response)
        })
    },
    findResource: function (id, resource, callback) {
        if (id && resource) {
            Clientes.findOne({nombre: 'Crístian'}, function (err, result) { // TODO Revisar parametro
                if (err) {
                    return callback(err,  null)
                }
                return callback(null,  result)
            }).populate(resource)
        }
    },
    delete: function (id, callback) {
        let ok = false;
        Clientes.findByIdAndRemove({ '_id': id}).then(() => {
            ok = true;
            return callback(null, ok)
        }).catch(err => {
            ok = false;
            return callback(err, ok)
        });
    }
};
