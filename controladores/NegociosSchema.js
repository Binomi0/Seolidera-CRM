'use strict';

const Negocios = require('../modelos/negocios');

module.exports = {

    find: function (body, callback) {
        Negocios.find(body, function (err, result) {
            if (err){
                return callback(err, null);
            }
            return callback(null, result)
        })
    },
    create: function (body, callback) {
        Negocios.create(body, function (err, negocios) {
            if (err){
                return callback(err, null);
            }
            return callback(null, negocios)
        })
    },
    update: function (id, body, callback) {
        Negocios.findOneAndUpdate(id, body, {new: true}, function (err, response) {
            if (err) {
                return callback(err,  null);
            }
            return callback(null, response)
        })
    }
};
