const express = require('express');
const cors = require('cors');
const app = express();

// IMPORTACION RUTAS
const usuariosRoutes = require('./src/routers/usuarios.routes');
const empresasRoutes = require('./src/routers/empresas.routes');
const empleadosRoutes = require('./src/routers/empleados.routes');




// MIDDLEWARES
app.use(express.urlencoded({ extended: false}));
app.use(express.json());

// CABECERAS
app.use(cors());


// CARGA DE RUTAS localhost:3000/api/usuarios, empresas etc
app.use('/api', usuariosRoutes, empresasRoutes, empleadosRoutes)

module.exports = app;