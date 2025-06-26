const conexion = require('../../../database/conexion');

let newUsuarioController = {
    mostrarUsuarios: function(req, res) {
    let usuarios = "SELECT * FROM usuarios";
    conexion.query(usuarios, function(error, resultados) {
        if (error) {
            throw error;
        } else {
            res.render("../../src/views/login/tablaUsuarios", { usuarios: resultados });
        }
    });},
    new: function(req, res) {
        res.render("../../src/views/login/crearUsuario")
    },
    agregarUsuario:function(req,res){
    const datos= req.body;
    let unNombre=datos.nombre;
    let unGmail=datos.gmail;
    let unaContrasenia=datos.contrasenia;
    let unNacimiento=datos.nacimiento;
    let unDocumento=datos.documento;

    let registrar = "INSERT INTO usuarios (nombre, gmail, contrasenia, nacimiento, documento, admin) VALUES( '"+unNombre+"', '"+unGmail+"', '"+unaContrasenia+"', '"+unNacimiento+"', '"+unDocumento+"','0' )"
    conexion.query(registrar,function(error){
        if(error){
         throw error
        }else{
            console.log("Usuario regustrado correctamente");
            res.redirect("/")
        }})
    },
    login: function(req, res) {
        res.render("../../src/views/login/loginUsuario")
    },
    loginUsuario: function(req, res) {
        const datos = req.body;
        let unGmail = datos.gmail;
        let unaContrasenia = datos.contrasenia;

        let login = "SELECT * FROM usuarios WHERE gmail = ? AND contrasenia = ?";
        let consulta = "SELECT * FROM destinos";

        conexion.query(login, [unGmail, unaContrasenia], function(error, resultados) {
          if (error) {
            throw error;
          }

          if (resultados.length > 0) {
            console.log("Usuario autenticado correctamente");
            conexion.query(consulta, function(error2, destinos) {
              if (error2) {
                throw error2;
              }
              res.render("login/homeLogeado", { resultados: resultados, destinos: destinos });
          });

    } else {
      console.log("Nombre o contraseña incorrectas");
      res.send("Usuario o contraseña incorrecta");
    }
  });
}

}

module.exports = newUsuarioController;
