const Empresas = require('../models/empresas.model');
const mongoose = require('mongoose');
const Usuario = require('../models/usuarios.model');




function agregarEmpresa(req, res) {
    const parametros = req.body;
    const modeloEmpresas = new Empresas();

    if(parametros.nombreEmpresa && parametros.lugar && parametros.correo && parametros.telefono){

        modeloEmpresas.nombreEmpresa = parametros.nombreEmpresa;
        modeloEmpresas.lugar = parametros.lugar;
        modeloEmpresas.correo = parametros.correo;
        modeloEmpresas.telefono = parametros.telefono;
        modeloEmpresas.save((err, empresaGuardado) => {
            if(err) return res.status(400).send({ mensaje: 'Erorr en la peticion.' });
            if(!empresaGuardado) return res.status(400).send({ mensaje: 'Error al agregar la empresa.'});

            return res.status(200).send({ empresa: empresaGuardado });
        })

    } else {
        return res.status(400).send({ mensaje: 'Debe enviar los parametros obligatorios.' })
    }
}


function EditarEmpresa(req, res) {
    var idEmpresa = req.params.idEmpresa;
    var parametros = req.body;

    Empresas.findByIdAndUpdate(idEmpresa, parametros, { new : true } ,(err, empresaEditada)=>{
        if (err) return res.status(500).send({ mensaje: 'Error en la peticion' });
        if(!empresaEditada) return res.status(404)
            .send({ mensaje: 'Error al Editar la Empresa' });

        return res.status(200).send({ empresa: empresaEditada});
    })
}


function EliminarEmpresa(req, res) {
    var idEmpresa = req.params.idEmpresa;

    Empresas.findByIdAndDelete(idEmpresa, (err, empresaEliminada)=>{
        if(err) return res.status(500).send({ mensaje: 'Error en la peticion' });
        if(!empresaEliminada) return res.status(500)
            .send({ mensaje: 'Error al eliminar la Empresa' })

        return res.status(200).send({ empresa: empresaEliminada });
    })
}


function obtenerPorId(req, res){
    var empleadoId = req.params.idEmpleado;

    Empresas.find({empleados: {$elemMatch: {_id: empleadoId}}}, (err, empleadosEncontrados) => {
        if (err) return res.status(500).send({ mensaje: 'Error en  la peticion'});
        if(!empleadosEncontrados) return res.status(500).send({ mensaje: 'Error al buscar el empleado por Empresa'})

        return res.status(200).send({ empresa: empleadosEncontrados})
    })
}




function obtenerNombreEmpleado(req, res) {
    var empresaId = req.params.idEmpresa;
    var parametros = req.body;

    Empresas.aggregate([
        {
            $match: { "_id": mongoose.Types.ObjectId(empresaId) }
        },
        {
            $unwind: "$empleados"
        },
        {
            $match: { "empleados.nombreEmpleado": { $regex: parametros.nombreEmpleado, $options: 'i' } }
        }, 
        {
            $group: {
                "_id": "$_id",
                "nombreEmpresa": { "$first": "$nombreEmpresa" },
                "empleados": { $push: "$empleados" }
            }
        }
    ]).exec((err, empleadosEncontrados) => {
        return res.status(200).send({ empresa: empleadosEncontrados })
    })
}



function obtenerPuestoEmpleado(req, res) {
    var empresaId = req.params.idEmpresa;
    var parametros = req.body;

    Empresas.aggregate([
        {
            $match: { "_id": mongoose.Types.ObjectId(empresaId) }
        },
        {
            $unwind: "$empleados"
        },
        {
            $match: { "empleados.puesto": { $regex: parametros.puesto, $options: 'i' } }
        }, 
        {
            $group: {
                "_id": "$_id",
                "nombreEmpresa": { "$first": "$nombreEmpresa" },
                "empleados": { $push: "$empleados" }
            }
        }
    ]).exec((err, empleadosEncontrados) => {
        return res.status(200).send({ empresa: empleadosEncontrados })
    })
}


function obtenerDepartamentoEmpleado(req, res) {
    var empresaId = req.params.idEmpresa;
    var parametros = req.body;

    Empresas.aggregate([
        {
            $match: { "_id": mongoose.Types.ObjectId(empresaId) }
        },
        {
            $unwind: "$empleados"
        },
        {
            $match: { "empleados.departamento": { $regex: parametros.departamento, $options: 'i' } }
        }, 
        {
            $group: {
                "_id": "$_id",
                "nombreEmpresa": { "$first": "$nombreEmpresa" },
                "empleados": { $push: "$empleados" }
            }
        }
    ]).exec((err, empleadosEncontrados) => {
        return res.status(200).send({ empresa: empleadosEncontrados })
    })
}




function obtenerTodosLosEmpleados(req, res) {
    var empresaId = req.params.idEmpresa;
    var parametros = req.body;

    Empresas.aggregate([
        {
            $match: { "_id": mongoose.Types.ObjectId(empresaId) }
        },
        {
            $unwind: "$empleados"
        },
        {
            $group: {
                "_id": "$_id",
                "nombreEmpresa": { "$first": "$nombreEmpresa" },
                "empleados": { $push: "$empleados" }
            }
        }
    ]).exec((err, empleadosEncontrados) => {
        return res.status(200).send({ empresa: empleadosEncontrados })
    })
}








function cantidadEmpleados(req, res) {
    var params = req.body;

    if (req.user.rol != "EMPRESA")
         return res.status(500).send({ mensaje: "Solo las empresas pueden buscar empleados" })

    if(!params.nombreEmpresa){
        return res.status(500).send({ mensaje: "Parametros incorrectos" });
    }else{
            Empresas.find({empresa: req.user.sub}).count().exec((err, empleadosEncontrados) => {
                if(err) return res.status(500).send({mensaje: 'Error en la peticion de los empleados'});
                if(!empleadosEncontrados) return res.status(500).send({mensaje: 'Error al obtener los empleados, no tienes empleados'});
                res.status(200).send({ mensaje: `${params.nombreEmpresa} tiene ${empleadosEncontrados} empleado(s)`})
            })

    }
}




module.exports = {
    agregarEmpresa,
    EditarEmpresa,
    EliminarEmpresa,
    obtenerPorId,
    obtenerNombreEmpleado,
    obtenerPuestoEmpleado,
    obtenerDepartamentoEmpleado,
    obtenerTodosLosEmpleados,
    cantidadEmpleados
    
}
