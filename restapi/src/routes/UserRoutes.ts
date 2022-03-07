
const express = require("express");
import * as UserController from '../controllers/UserController';

const router = express.Router();

router.get('/user/list', UserController.findUsers);
router.get('/user/list/:id', UserController.findUsersById);
router.post('/user/save',UserController.createUser);
router.post('/user/delete/:id',UserController.createUser);
router.post('/user/update/:id',UserController.createUser);
module.exports=router;

export default router;