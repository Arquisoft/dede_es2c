const express = require("express");
import * as ProductController from '../controllers/ProductController';
const router = express.Router();


// Generar un ejemplo
router.get('/product/generateExample', ProductController.generateExample);
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
// Productos añadir con Post
router.post('/product/addPost', ProductController.addProductPost);

router.get('/product/getByCodigo/:codigo', ProductController.getProductoByCodigo);
module.exports = router;
export default router;