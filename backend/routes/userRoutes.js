const router=require('express').Router();
const UserController= require('../controllers/userController');
router.get('/getByNumber',UserController.getUserbyMobile);
router.put('/login',UserController.updateUser);
module.exports=router