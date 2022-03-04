const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const empresaSchema = new Schema({
    nombreEmpresa: String,
    lugar: String,
    correo: String,
    telefono: String,
    empleados: [{
        nombreEmpleado: String,
        puesto: String,
        departamento: String,
        Usuario: { type: Schema.Types.ObjectId, ref: 'Usuarios' },
        email: String

    }],
    

})

module.exports = mongoose.model('Empresas', empresaSchema);