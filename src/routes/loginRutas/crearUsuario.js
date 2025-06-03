let express=require('express');
const newUsuarioController= require("../../controller/loginControladores/crearUsuarioController")
let router= express.Router()


router.get("/crearUsuario", newUsuarioController.new);
router.post("/nuevoUsuario",newUsuarioController.agregarUsuario);
router.get("/loginUsuario", newUsuarioController.login);
router.post("/loginUsuario",newUsuarioController.loginUsuario);
router.get("/mostrarUsuarios", newUsuarioController.mostrarUsuarios);


module.exports=router;