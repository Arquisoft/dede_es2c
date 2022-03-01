const express = require("express");
const  userAct = require("/restapi/src/controllers/UserController");
const router = express.Router();

router.get('/users', userAct.getUsers);

module.exports=router;