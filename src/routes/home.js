let express=require('express');
const homeController= require("../controller/homeController")
let router= express.Router()


router.get("/",homeController.home)

module.exports=router;