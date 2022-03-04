const Empresa = require('../models/empresas.model') ;

function agregarEmpleado(req, res) {
    const parametros = req.body;
    var empresaId = req.params.idEmpresa;

    if(parametros.nombreEmpleado && parametros.puesto && parametros.departamento){

        Empresa.findByIdAndUpdate(empresaId, {$push: {empleados: {nombreEmpleado: parametros.nombreEmpleado,
        puesto: parametros.puesto, departamento: parametros.departamento, 
        Usuario: req.user.sub}}}, {new: true}, (err, empleadoAgregado)=>{
            if(err) return res.status(500).send({ mensaje: 'Error en  la peticion'});
            if(!empleadoAgregado) return res.status(500).send({ mensaje: 'Error al agregar al empleado a la Empresa'});

            return res.status(200).send({ empresa: empleadoAgregado })

        })

} else {
    return res.status(500).send({ mensaje: 'Debe enviar los parametros necesarios.' })
}

}


function EditarEmpleado(req, res) {
    const parametros = req.body;
    var empresaId = req.params.idEmpleado;

        Empresa.findOneAndUpdate({empleados: {$elemMatch: {_id: empresaId}}},
           {"empleados.$.nombreEmpleado" : parametros.nombreEmpleado, 
           "empleados.$.puesto" : parametros.puesto, "empleados.$.departamento" : parametros.departamento}, 
           {new: true}, (err, empleadoEditado)=>{
            if(err) return res.status(500).send({ mensaje: 'Error en  la peticion'});
            if(!empleadoEditado) return res.status(500).send({ mensaje: 'Error al editar al empleado'});

            return res.status(200).send({ empleados: empleadoEditado })

        })
}



function EliminarEmpleado(req, res) {
    var idEmpleados = req.params.idEmpleado;


    Empresa.findOneAndUpdate({ empleados : { $elemMatch : { _id: idEmpleados } } }, 
        { $pull : { empleados : { _id : idEmpleados } } }, {new : true}, (err, empleadoEliminado)=>{
            if(err) return res.status(500).send({ mensaje: 'Error en la peticion'});
            if(!empleadoEliminado) return res.status(500).send({ mensaje: 'Error al eliminar el empleado'});

            return res.status(200).send({producto : empleadoEliminado})
        })
}





module.exports = {
    agregarEmpleado,
    EditarEmpleado,
    EliminarEmpleado,
}
