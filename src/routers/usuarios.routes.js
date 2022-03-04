// IMPORTACIONES
const express = require('express');
const usuariosControlador = require('../controllers/usuarios.controller');
const adminControlador = require('../controllers/admin.controller');

const md_autenticacion = require('../middlewares/autenticacion');
const md_roles = require('../middlewares/roles');


//RUTAS 
const api = express.Router();

api.post('/registrarEmpresa', [md_autenticacion.Auth, md_roles.verAdmin], usuariosControlador.RegistrarEmpresa);
api.post('/login', usuariosControlador.Login);
api.put('/editarUsuario/:idUsuario', md_autenticacion.Auth, usuariosControlador.EditarUsuario);



module.exports = api;