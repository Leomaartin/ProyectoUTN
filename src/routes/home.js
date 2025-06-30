let express=require('express');
const homeController= require("../controller/homeController")
let router= express.Router()


router.get("/",homeController.home);
router.get("/contacto",homeController.contacto)

module.exports=router;