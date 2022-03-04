var Excel = require('excel4node');
const Empresa = require('../models/empresas.model') ;


function empleadoExcel(req, res) {
    var libroTrabajo = new Excel.Workbook();
    var /*worksheet*/ hojaCalculo = libroTrabajo.addWorksheet('Sheet 1');
    var params = req.body;

    if (req.user.rol != "EMPRESA")
         return res.status(500).send({ mensaje: "Solo las empresas pueden buscar empleados" })

    if(!params.nombreEmpresa){
        return res.status(500).send({ mensaje: "Parametros incorrectos" });
    }else{
        //if(params.nombreEmpleado === req.user.nombreEmpleado){
            Empresa.find({empresa: req.user.sub}).exec((err, empleadosEncontrados) => {
                if(err) return res.status(500).send({mensaje: 'Error en la peticion de los empleados'});
                if(!empleadosEncontrados) return res.status(500).send({mensaje: 'Error al obtener los empleados, no tienes empleados'});
                var style = libroTrabajo.createStyle({
                    font: {
                      size: 20,
                      align: 'center'
                    },
                    numberFormat: '$#,##0.00; ($#,##0.00); -'
                  });
                
                  hojaCalculo.cell(2,7).string('Nuestros Empleados:').style(style);
                  hojaCalculo.cell(4,2).string(`${empleadosEncontrados}`);
                
                  libroTrabajo.write(`./src/Empleados de ${req.user.nombreEmpresa}.xlsx`);
                return res.status(200).send({ mensaje: `Excel generado de la empresa ${req.user.nombre}`});
            })
        //}/*else{
            //return res.status(500).send({ mensaje: "Eres una empresa ajena a los empleados" });
        //}
    }
}


module.exports = {
    empleadoExcel
    }