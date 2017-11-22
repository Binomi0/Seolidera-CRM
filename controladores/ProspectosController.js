'use strict';

const Prospectos = require('../modelos/prospectosSchema');

module.exports = {

    find: function (params, callback) {
        Prospectos.find(params, function (err, result) {
            if (err){
                return callback(err, null);
            }
            return callback(null, result)
        }).populate('_id')
    },

    create: function (params, callback) {
        Prospectos.create(params, function (err, response) {
            if (err){
                return callback(err, null);
            }
            return callback(null, response)
        })
    },

    update: function (id, body, callback) {
        Prospectos.findOneAndUpdate({ '_id': id }, body, {new: true}, function (err, response) {
            if (err) {
                return callback(err,  null);
            }
            return callback(null, response)
        })
    },

    findResource: function (resource, id, callback) {
        Prospectos.findOne({_id: id}, function (err, result) {
            if (err) {
                return callback(err,  null)
            }
            return callback(null,  result)
        }).populate(resource)
    },
    delete: function (id, callback) {
        let ok = false;
        Prospectos.findByIdAndRemove({ '_id': id}).then(() => {
            ok = true;
            return callback(null, ok)
        }).catch(err => {
            ok = false;
            return callback(err, ok)
        });
    }

};
