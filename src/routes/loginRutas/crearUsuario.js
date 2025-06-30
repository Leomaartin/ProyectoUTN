const express = require('express');
const newUsuarioController = require('../../controller/loginControladores/crearUsuarioController');
const router = express.Router();

router.get('/crearUsuario', newUsuarioController.new);
router.post('/nuevoUsuario', newUsuarioController.agregarUsuario);

router.get('/login', newUsuarioController.login);
router.post('/loginUsuario', newUsuarioController.loginUsuario);
router.get('/logout', newUsuarioController.logout);

router.get('/mostrarUsuarios', newUsuarioController.mostrarUsuarios);
router.delete('/usuarios/:id', newUsuarioController.borrarUsuario);
router.put('/usuarios/:id', newUsuarioController.editarUsuario);

module.exports = router;