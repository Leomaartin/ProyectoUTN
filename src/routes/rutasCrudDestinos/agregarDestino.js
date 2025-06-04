let express = require('express');
const destinoController = require("../../controller/crudDestino/agregarDestinoController");
let multer = require('multer');
let router = express.Router();

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'public/images'); 
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage });

router.get("/agregarDestino", destinoController.destino);
router.post("/nuevoDestino", upload.array('imagenes', 5), destinoController.agregarDestino);
router.get("/detalleDestino/:id", destinoController.detalle);
router.get("/editarDetalle/:id", destinoController.editarDetalle);
router.post("/editarDestino/:id", upload.array('imagenes', 5), destinoController.procesoEditar); 
router.get("/editarDestino", destinoController.editar);
router.post("/borrarDestino/:id", destinoController.procesoBorrar);

module.exports = router;
