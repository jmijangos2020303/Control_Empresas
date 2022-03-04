const mongoose = require('mongoose');
const app = require('./app');
var controladorAdmin = require("./src/controllers/admin.controller");


mongoose.Promise = global.Promise;                                                                  //function (){}
mongoose.connect('mongodb://localhost:27017/ControlDeEmpresas', { useNewUrlParser: true, useUnifiedTopology: true }).then(()=>{
    console.log("Se encuentra conectado a la base de datos.");

    controladorAdmin.RegistrarAdmin();

    app.listen(3000, function () {
        console.log("Hola PROFE, esta corriendo en el puerto 3000!")
    })

}).catch(error => console.log(error));