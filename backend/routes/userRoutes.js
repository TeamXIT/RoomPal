const router=require('express').Router();
const UserController= require('../controllers/userController');
router.get('/getByNumber',UserController.getUserbyMobile);
router.put('/update',UserController.updateUser);
module.exports=router