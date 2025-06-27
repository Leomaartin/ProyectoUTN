
let carritoController = {
    carrito: function(req, res) {
          res.render("../../src/views/carrito")
    },
    agregar: function(req,res){
        unNombre=req.body.nombreDestino;
        unPais=req.body.pais;
        unPrecioe=req.body.precio;
        inaImg=req.files.map(file => file.filename).join(',');

    }
};

module.exports = carritoController;
