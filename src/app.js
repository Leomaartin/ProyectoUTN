const express = require('express');
const app = express();
const path = require('path');
const mysql = require('mysql');
const session = require('express-session');
const multer = require('multer');

const rutaHome = require("./routes/home");
const rutaDestino = require("./routes/rutasCrudDestinos/agregarDestino");
const rutaNewUsuario = require("./routes/loginRutas/crearUsuario");
let rutaCarrito = require ("./routes/carrito");

app.use(session({
  secret: 'mi-clave-secreta', 
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 2 
  }
}));
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use((req, res, next) => {
    res.locals.user = req.session.user || null;
    next();
});


app.use(rutaHome);
app.use(rutaDestino);
app.use(rutaNewUsuario);
app.use(rutaCarrito);


app.listen(3050, () => {
    console.log("Servidor corriendo en puerto 3050");
});



