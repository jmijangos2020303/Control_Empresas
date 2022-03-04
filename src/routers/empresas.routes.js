const express = require('express');
const controladorEmpresas = require('../controllers/empresas.controller');

const md_autenticacion = require('../middlewares/autenticacion');
const md_roles = require('../middlewares/roles');
const pdfDocumento = require('../services/pdf.services');
const xmlDocumento = require('../services/excel.services');



const api = express.Router();


api.post('/agregarEmpresa', [md_autenticacion.Auth, md_roles.verAdmin], controladorEmpresas.agregarEmpresa);
api.put('/editarEmpresa/:idEmpresa', [md_autenticacion.Auth, md_roles.verAdmin], controladorEmpresas.EditarEmpresa);
api.delete('/eliminarEmpresa/:idEmpresa', [md_autenticacion.Auth, md_roles.verAdmin], controladorEmpresas.EliminarEmpresa);
api.get('/obtenerPorId/:idEmpleado', [md_autenticacion.Auth, md_roles.verEmpresa], controladorEmpresas.obtenerPorId);
api.get('/obtenerNombreEmpleado/:idEmpresa', [md_autenticacion.Auth, md_roles.verEmpresa], controladorEmpresas.obtenerNombreEmpleado);
api.get('/obtenerPuestoEmpleado/:idEmpresa', [md_autenticacion.Auth, md_roles.verEmpresa], controladorEmpresas.obtenerPuestoEmpleado);
api.get('/obtenerDepartamentoEmpleado/:idEmpresa', [md_autenticacion.Auth, md_roles.verEmpresa], controladorEmpresas.obtenerDepartamentoEmpleado);
api.get('/obtenerTodos/:idEmpresa', [md_autenticacion.Auth, md_roles.verEmpresa], controladorEmpresas.obtenerTodosLosEmpleados);
api.get('/empresaPdf/:idEmpresa', [md_autenticacion.Auth, md_roles.verEmpresa], pdfDocumento.empresaPdf);
api.get('/empleadoExcel', [md_autenticacion.Auth, md_roles.verEmpresa], xmlDocumento.empleadoExcel);
api.get('/controlPersonal', md_autenticacion.Auth, controladorEmpresas.cantidadEmpleados);










module.exports = api;