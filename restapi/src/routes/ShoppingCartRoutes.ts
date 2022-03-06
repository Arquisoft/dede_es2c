const express = require("express");
import * as ShoppingCartController from '../controllers/ShoppingCartController';

const router = express.Router();

// Busca todos
router.get('/shoppingCart/list', ShoppingCartController.findShoppingCarts);
// Precio que coincida con un carrito
router.get('/shoppingCart/getByPrice/:price', ShoppingCartController.getShoppingCartByPrice);
// Busco el carrito por el ID
router.get('/shoppingCart/getByID/:id', ShoppingCartController.getShoppingCartByID);

module.exports = router;

export default router;