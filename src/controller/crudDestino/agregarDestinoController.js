const conexion = require('../../../database/conexion');


let destinoController={
     detalle:function(req, res) {
  conexion.query("SELECT * FROM destinos WHERE id = ?", [req.params.id], function(error, resultados) {
    if (error) {
      throw error;
    }

    if (resultados.length > 0) {
      res.render("opciones/detalleDestino", { destino: resultados[0] });
    } else {
      res.send("Destino no encontrado");
    }})
   },
    destino:function(req,res){
        res.render("../../src/views/opciones/agregarDestino")
    },
    agregarDestino:function(req,res){
    const datos= req.body;
    let unNombre=datos.nombreDestino;
    let unaDescripcion=datos.descripcion;
    let unPais=datos.pais;
    let unaFecha=datos.fechaviaje;
    let unPrecio=datos.precio;
    let cantDispo=datos.cantidadDisponible;
    let nombreimg = req.file ? req.file.filename : null;

    let registrar = "INSERT INTO destinos (nombreDestino, descripcion, pais, fechaviaje, precio, cantidadDisponible, img) VALUES( '"+unNombre+"', '"+unaDescripcion+"', '"+unPais+"', '"+unaFecha+"', '"+unPrecio+"','"+cantDispo+"','"+nombreimg+"')"
    conexion.query(registrar,function(error){
        if(error){
         throw error
        }else{
            console.log("Datos almacenados correctamente");
            res.redirect("/")
        }

    })
},
editarDetalle:function(req, res) {
  conexion.query("SELECT * FROM destinos WHERE id = ?", [req.params.id], function(error, resultados) {
    if (error) {
      throw error;
    }

    if (resultados.length > 0) {
      res.render("opciones/editarDetalle", { destino: resultados[0] });
    } else {
      res.send("Destino no encontrado");
    }
  })
},
procesoEditar: function(req, res) {
    const datos = req.body;
    const idDestino = req.params.id;

    let unNombre = datos.nombreDestino;
    let unaDescripcion = datos.descripcion;
    let unPais = datos.pais;
    let unaFecha = datos.fechaviaje;
    let unPrecio = datos.precio;
    let cantDisponible = datos.cantidadDisponible;
    let nombreimg = req.file ? req.file.filename : null;

    let actualizar = `
        UPDATE destinos 
        SET nombreDestino = ?, descripcion = ?, pais = ?, fechaviaje = ?, precio = ?, cantidadDisponible = ?,img = ?
        WHERE id = ?
    `;

    let valores = [unNombre, unaDescripcion, unPais, unaFecha, unPrecio, cantDisponible, nombreimg , idDestino];

    conexion.query(actualizar, valores, function(error) {
        if (error) {
            throw error;
        } else {
            console.log("Destino actualizado correctamente");
            res.redirect("/editarDestino"); 
        }
    });
    },
 editar:function(req, res) {
        conexion.query("SELECT * FROM destinos", (error, nose) => {
            if (error) {
                throw error;
            } else {
                res.render("opciones/editarDestino", { nose: nose });
            }
        });
    },
   procesoBorrar: function(req, res) {
    const idDestino = req.params.id;

    let borrar = `DELETE FROM destinos WHERE id = ?`;

    conexion.query(borrar, [idDestino], function(error) {
        if (error) {
            throw error;
        } else {
            console.log("Destino eliminado correctamente");
            res.redirect("/editarDestino");
        }
    });
}
}

module.exports=destinoController;