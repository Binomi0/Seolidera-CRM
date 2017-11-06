'use strict';

const Negocios = require('../modelos/negociosSchema');

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
        Negocios.findOneAndUpdate({ '_id': id }, body, {new: true}, function (err, response) {
            if (err) {
                return callback(err,  null);
            }
            return callback(null, response)
        })
    },
    delete: function (id, callback) {
        let ok = false;
        Negocios.findByIdAndRemove({ '_id': id}).then(() => {
            ok = true;
            return callback(null, ok)
        }).catch(err => {
            ok = false;
            return callback(err, ok)
        });
    }
};
