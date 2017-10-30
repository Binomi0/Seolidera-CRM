const express = require('express');
const router = express.Router();
const controllers = require('../controladores');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'GooglePartner API', message: 'GooglePartner' });
});

router.get('/:resource', function (req, res) {
    let resource = req.params.resource;
    let controller = controllers[resource];
    // console.log('Resource:', resource)
    // console.log('Controlador:', controller)

    if (controller) {
        controller.find({}, function (err, result) {
            // console.log('Resultado:', result)
            if (err) throw err;
            res.json(result)
        })
    } else {
        res.render(resource, { title: `CRM | ${resource}`});
    }
});

router.get('/:resource/:id', function (req, res) {
    // console.log('Resource/id');

    let resource = req.params.resource;
    // let action = req.params.action;
    let id = req.params.id;
    let controller = controllers[resource];
    // console.log(resource);
    // console.log(action);
    // console.log(id);

    if (controller === null ) {
        res.json({
            confirmation: 'Fallo',
            message: `Recurso no válido: ${resource}`
        });
    }

    if (id === null) {
        controller.find({ _id: id }, function (err, result) {
            res.render(resource, {id: result})
        });
    }

    function sendParams(param) {
        let response = {};
        controller.find({ [param]: id  }, function(err, result) {
            if (err) {
                response  = res.json({
                    confirmacion: 'Fallo',
                    message: `Recurso no válido ${resource}, Id no válida ${id}`
                });
            }

            if (result.length >= 1) {
                response = res.json({
                    confirmation: 'success',
                    result
                })
            }
            return response
        });
    }

    if (resource === 'clientes')
        sendParams('_id');
    else
        sendParams('cliente');
});

router.post('/:resource/?:action', function (req, res) {
    let resource = req.params.resource;
    let action = req.params.action;
    let controller = controllers[resource];
    let id = req.body.cliente || req.body.negocio || req.body.tareas || req.body.llamada;
    // console.log('Resource:', resource);
    // console.log('Action:', action);
    // console.log('id:', id);

    if (controller === null ){
        res.json({
            confirmation: 'fallo',
            message: 'Recurso no válido: '+resource
        });
        return
    }
    if (action === null) {

    }

    switch (action) {
        case null:
            res.json({
                confirmation: 'fallo',
                message: 'Acción no válida: '+action
            });
            break;
        case 'nuevo':
            // console.log(`Accion: ${action}`);
            controller.create(req.body, function(err, result) {
                // console.log('Resultado de crear', resource, result);
                if (err) {
                    res.json({
                        confirmacion: `Error al crear el recurso: '${resource}' `,
                        mensaje: err
                    });
                }
                if (resource !== 'clientes') {
                    controllers['clientes'].update(id, resource, result._id, function (err, result2) {
                        console.log('Actualizando cliente', result2);
                        if (err) {
                            res.json({
                                respuesta: 'Ha habido un error al actualizar el negocio del cliente',
                                error: err
                            });
                            return
                        }
                        res.json({
                            respuesta: 'Actualización OK',
                            negocio: result,
                            cliente: result2
                        })
                    });
                } else {
                    res.json({
                        confirmation: 'Respuesta OK',
                        result
                    });
                }
            });
            break;
        case 'editar':
            // console.log(`Editando ${resource} `);
            controller.update(id, req.body, function (err, result) {
                if (err) {
                    res.json({
                        respuesta: 'Ha habido un error al actualizar el negocio',
                        mensaje: err
                    })
                }
                // console.log('Result',result);
                controllers['clientes'].update(id, { [resource]: result}, function (err, result2) {
                    console.log('Actualizando cliente', result2);
                    if (err) {
                        res.json({
                            respuesta: 'Ha habido un error al actualizar el negocio del cliente',
                            error: err
                        });
                        return
                    }
                    res.json({
                        respuesta: 'Actualización OK',
                        negocio: result,
                        cliente: result2
                    })
                });
            });
            break;
        default:
            break;
    }

    if (resource === 'negocios') {

    }

});


module.exports = router;


