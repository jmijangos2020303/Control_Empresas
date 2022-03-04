const express = require('express');
const controladorEmpleados = require('../controllers/empleados.controller');

const md_autenticacion = require('../middlewares/autenticacion');
const md_roles = require('../middlewares/roles');

const api = express.Router();

api.post('/agregarEmpleado/:idEmpresa', [md_autenticacion.Auth, md_roles.verEmpresa], controladorEmpleados.agregarEmpleado);
api.put('/editarEmpleado/:idEmpleado', [md_autenticacion.Auth, md_roles.verEmpresa], controladorEmpleados.EditarEmpleado);
api.delete('/eliminarEmpleado/:idEmpleado', [md_autenticacion.Auth, md_roles.verEmpresa], controladorEmpleados.EliminarEmpleado);

module.exports = api;
