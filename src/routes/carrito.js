let express=require('express');
const carritoController= require("../controller/carritoController")
let router= express.Router()


router.get("/carrito",carritoController.carrito);
router.post("/carrito",carritoController.agregar);

module.exports=router;