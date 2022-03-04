const Usuario = require('../models/usuarios.model');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('../services/jwt');



function RegistrarAdmin(req, res) {
    var usuarioModel = new Usuario();


    usuarioModel.nombre = 'Admin';
    usuarioModel.apellido = 'Admin';
    usuarioModel.email = 'Admin';
    usuarioModel.rol = 'ADMIN';
    usuarioModel.imagen = null;

    Usuario.find({ email : 'Admin' }, (err, usuarioEncontrado) => {
        if ( usuarioEncontrado.length == 0 ) {

            bcrypt.hash('123456', null, null, (err, passwordEncriptada) => {
                usuarioModel.password = passwordEncriptada;

                usuarioModel.save((err, usuarioGuardado) => {
                    if (err) return res.status(500)
                        .send({ mensaje: 'Error en la peticion' });
                    if(!usuarioGuardado) return res.status(500)
                        .send({ mensaje: 'Error al agregar el Usuario'});
                    
                });
            });                    
        }
    })
    
}


module.exports = {
    RegistrarAdmin,
}