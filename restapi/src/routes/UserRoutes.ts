
const express = require("express");
import * as UserController from '../controllers/UserController';

const router = express.Router();

router.get('/user/list', UserController.findUsers);
router.get('/user/list/:email', UserController.findUsersByEmail);
router.get('/user/isAdmin/:token', UserController.isAdmin);
router.post('/user/signup',UserController.createUser);
router.post('/user/login',UserController.loginUser);
router.post('/user/delete/:id',UserController.deleteUser);
router.post('/user/update/:id',UserController.update);
module.exports=router;

export default router;