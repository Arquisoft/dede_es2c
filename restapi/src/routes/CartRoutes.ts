const express = require("express");
import * as CartController from '../controllers/CartController';
const router = express.Router();

router.post('/cart/add', CartController.createCart);


export default router;