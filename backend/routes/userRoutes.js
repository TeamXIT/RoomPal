const router=require('express').Router();
const UserController= require('../controllers/userController');
router.get('/getByNumber',UserController.getUserbyMobile);
router.put('/update',UserController.updateUser);
router.put('/addToFavourites',UserController.addToFavourites);
router.put('/removeFromFavourites',UserController.removeFromFavourites)
module.exports=router