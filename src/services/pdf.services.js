const Empresas = require('../models/empresas.model');
var pdf = require('html-pdf');



function empresaPdf (req, res){
    let empresaId = req.params.idEmpresa;

    Empresas.findOne({_id: empresaId}).populate().exec((err, empresaFind)=>{
        if(err){
            return res.status(500).send({message: 'Error al crear el PDF'})
        }else if(empresaFind){
            let empleados = empresaFind.empleados;
            let empleadosEncontrados = [];
            empleados.forEach(dato =>{
                empleadosEncontrados.push(dato);
            })
            console.log(empleadosEncontrados);

            empleadosEncontrados.forEach(dato => {
                Empresas.find({_id: dato}).exec((err, empleadoEncontrado)=>{
                    if(err){
                        console.log(err);
                    }else if(empleadosEncontrados.length > 0){
                        let empleados = empleadoEncontrado;
                        empleados.forEach(dato =>{
                            empleadosEncontrados.push(dato);
                        })

            let contenido = `
            <!doctype html>
            <html>
            <head>
                <meta charset="utf-8">
                    <title>PDF</title>
                </head>
                <body>
                <table border="1" style="margin: 0 auto; ">
                <tbody>
                    <tr>
                        <th style="font-size: 25px"> Nombre </th>
                        <th style="font-size: 25px"> Departamento </th>
                        <th style="font-size: 25px"> Puesto </th>
                    </tr>
                    ${empleadosEncontrados.map(empleados => 
                        `<tr><td "font-size: 15px">${empleados.nombreEmpleado}</td>
                             <td "font-size: 15px">${empleados.departamento}</td>
                             <td "font-size: 15px">${empleados.puesto}</td></tr>`).join(' ')}
                </tbody>    
                </table>        
                </body>
            </html>
            `;

            let opciones = {
                "header": {
                    "height": "60px",
                    
                    "contents": `<div style="text-align: center; background-color:#a0dcef; font-size:40px">`  + empresaFind.nombreEmpresa + `</div>` 
                }
            }

            pdf.create(contenido, opciones).toFile('./PDF/Empleados' + empresaFind.nombreEmpresa + `.pdf`, (err, res)=>{
                if(err){
                    console.log(err);
                }else{
                    console.log(res);
                }
            })
        }else{
            return res.status(403).send({message: 'No se entontraron contactos'})
        }
    })
})
res.status(200).send({message: 'El pdf fue creado'})
}else{
    res.status(404).send({message: 'No se encontraron empleados'})
}
    })

}


module.exports = {
    empresaPdf
}