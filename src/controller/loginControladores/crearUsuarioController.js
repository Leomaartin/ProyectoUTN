const bcrypt = require('bcryptjs');
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
    });
  },
  new: function(req, res) {
    res.render("../../src/views/login/crearUsuario")
  },
  agregarUsuario: function(req, res) {
    const datos = req.body;
    let unNombre = datos.nombre;
    let unGmail = datos.gmail;
    let unaContrasenia = datos.contrasenia;
    let unNacimiento = datos.nacimiento;
    let unDocumento = datos.documento;

    bcrypt.hash(unaContrasenia, 10, function(err, hash) {
      if (err) {
        throw err;
      }
      let registrar = "INSERT INTO usuarios (nombre, gmail, contrasenia, nacimiento, documento, admin) VALUES (?, ?, ?, ?, ?, 0)";
      conexion.query(registrar, [unNombre, unGmail, hash, unNacimiento, unDocumento], function(error) {
        if (error) {
          throw error;
        } else {
          console.log("Usuario registrado correctamente");
          res.redirect("/");
        }
      });
    });
  },
  login: function(req, res) {
    res.render("../../src/views/login/loginUsuario", { error: null });
  },
  loginUsuario: function(req, res) {
    const datos = req.body;
    let unGmail = datos.gmail;
    let unaContrasenia = datos.contrasenia;

    let login = "SELECT id, nombre, gmail, contrasenia, admin FROM usuarios WHERE gmail = ?";
    conexion.query(login, [unGmail], function(error, resultados) {
      if (error) {
        throw error;
      }

      if (resultados.length > 0) {
        let usuario = resultados[0];
        bcrypt.compare(unaContrasenia, usuario.contrasenia, function(err, result) {
          if (result) {
            req.session.user = {
              id: usuario.id,
              nombre: usuario.nombre,
              gmail: usuario.gmail,
              admin: usuario.admin
            };

            let consulta = "SELECT * FROM destinos";
            conexion.query(consulta, function(error2, destinos) {
              if (error2) {
                throw error2;
              }
              res.render("login/homeLogeado", {
                user: req.session.user,
                destinos: destinos
              });
            });
          } else {
            res.render("../../src/views/login/loginUsuario", { error: "Usuario o contraseña incorrecta" });
          }
        });
      } else {
        res.render("../../src/views/login/loginUsuario", { error: "Usuario o contraseña incorrecta" });
      }
    });
  },
  logout: function(req, res) {
    req.session.destroy(function() {
      res.redirect("/login");
    });
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
  const id = req.params.id;
  const { nombre, gmail, documento, nacimiento, admin } = req.body;

  conexion.query(
    `UPDATE usuarios
     SET nombre = ?,
         gmail = ?,
         documento = ?,
         nacimiento = ?,
         admin = ?
     WHERE id = ?`,
    [nombre, gmail, documento, nacimiento, admin, id],
    (err) => {
      if (err) {
  console.error('Error al editar usuario:', err.sqlMessage || err);
  return res.status(500).json({ mensaje: 'Error al editar usuario', error: err.sqlMessage || err });
}
      res.json({ mensaje: 'Usuario editado correctamente' });
    }
  );

  }}


module.exports = newUsuarioController;