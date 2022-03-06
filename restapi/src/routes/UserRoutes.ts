const express = require("express");
import * as UserController from '../controllers/UserController';

const router = express.Router();

router.get('/user/list', UserController.findUsers);
router.get('/user/list:id', UserController.findUsersById);
module.exports=router;

export default router;