const express = require("express");
import * as UserController from '../controllers/UserController';

const router = express.Router();

router.get('/user/list', UserController.findUsers);

module.exports=router;

export default router;