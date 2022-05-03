
const express = require("express");
import * as UserController from '../controllers/UserController';
import {validateEmail} from '../middlewares/signupValidator';

const router = express.Router();

router.get('/user/list', UserController.findUsers);
router.get('/user/list/:email', UserController.findUsersByEmail);
router.get('/user/listById/:id', UserController.findUsersById);
router.post('/user/signup',validateEmail,UserController.createUser);
router.post('/user/login',UserController.loginUser);
router.post('/user/delete/:id',UserController.deleteUser);
router.get('/user/deleteByEmail/:email',UserController.deleteUserByEmail);
router.put('/user/update/:id',UserController.update);
router.post('/user/giveAdmin',UserController.giveAdminRole);
router.get('/user/pod/:name',UserController.getUserPOD);
// Extra
router.get('/user/findById/:id', UserController.findUsersById);
module.exports=router;

export default router;