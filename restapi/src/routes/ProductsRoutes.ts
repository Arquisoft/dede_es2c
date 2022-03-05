const express = require("express");
import * as ProductController from '../controllers/ProductController';

const router = express.Router();

// Busca todos
router.get('/product/list', ProductController.findProducts);
// Producto por codigo propio de cada uno
router.get('/product/getByCode/:codigo', ProductController.getProductoByCode);
// Productos por la categoria a la que pertenencen
router.get('/product/getByCategoria/:categoria', ProductController.getProductsByCategoria);
// Productos por su id, NO FUNCIONA
router.get('product/getById/:id', ProductController.getProductoByID);

module.exports = router;

export default router;