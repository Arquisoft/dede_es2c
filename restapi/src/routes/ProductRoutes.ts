const express = require("express");
import * as ProductController from '../controllers/ProductController';
const router = express.Router();


// Generar un ejemplo
router.get('/product/generateExample', ProductController.generateExample);
// Añadir un producto por URL
router.get('/product/add/:codigo/:categoria/:nombre/:precio/:descripcion/:stock/:url', ProductController.addProduct);
// Eliminar por URL
router.get('/product/delete/:codigo', ProductController.deleteProduct);
// Actualizar por URL
router.get('/product/update/:codigo/', ProductController.updateProduct);
// Listar productos
router.get('/product/list', ProductController.getProducts);
// Producto por codigo propio de cada uno
router.get('/product/getByCode/:codigo', ProductController.getProductoByCode);
// Productos por categoría 
router.get('/product/getByCategoria/:categoria', ProductController.getProductsByCategoria);
// Productos por precio ordenado
router.get('/product/getByPrecio/:precio', ProductController.getProductByPrice);
module.exports = router;
export default router;