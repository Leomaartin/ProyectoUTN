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

        let login = "SELECT * FROM usuarios WHERE gmail = ? AND contrasenia = ?"
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
    }})
   }, 
  borrarUsuario: function(req, res) {
    const id = req.params.id;
    const query = "DELETE FROM usuarios WHERE id = ?";
    conexion.query(query, [id], function(error) {
        if (error) {
            console.error("Error al borrar usuario:", error);
            res.status(500).json({ success: false, error });
        } else {
            res.json({ success: true, message: "Usuario eliminado" });
        }
    });
  },
editarUsuario(req, res) {
  conexion.query(
    `UPDATE usuarios
     SET  nombre = ?,
          gmail  = ?,
          contrasenia = ?,
          documento   = ?,
          nacimiento  = ?,
          admin       = ?
     WHERE id = ?`,
    [
      req.body.nombre,
      req.body.gmail,
      req.body.contrasenia,
      req.body.documento,
      req.body.nacimiento,
      req.body.admin,
      req.body.id
    ],
    (err) => {
      if (err) {
        console.error('Error al editar usuario:', err);
        return res.status(500).json({ mensaje: 'Error al editar usuario' });
      }
      res.json({ mensaje: 'Usuario editado correctamente' });
    }
  );
}


}

module.exports = newUsuarioController;
