const express = require("express");
import * as CartController from '../controllers/CartController';
const router = express.Router();

router.post('/cart/add', CartController.createCart);
router.put('/cart/addProduct', CartController.addProduct);
router.put('/cart/deleteProduct', CartController.deleteProduct);

export default router;