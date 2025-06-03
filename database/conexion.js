const mysql = require("mysql");

const conexion = mysql.createConnection({
    host: "localhost",
    database: "travelstigers",
    user: "root",
    password: "root"
});

module.exports = conexion;