const express= require('express');
const app=express();
const path=require('path');
const mysql=require("mysql");
const multer = require('multer');




let rutaHome = require ("./routes/home");
let rutaDestino = require ("./routes/rutasCrudDestinos/agregarDestino");
let rutaNewUsuario = require ("./routes/loginRutas/crearUsuario");




app.use(express.static(path.join(__dirname, '../public')));

app.use(express.urlencoded({extended:false}));
app.use(express.json());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.listen(3050, () => {
    console.log("Servidor corriendo en puerto 3050")
});


app.use(rutaHome);
app.use(rutaDestino);
app.use(rutaNewUsuario);


