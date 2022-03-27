const express = require("express");
import * as ProductController from '../controllers/ProductController';
const router = express.Router();

//********* PRODUCTOS **********//

// Busca todos
router.get('/product/list', ProductController.findProducts);
// Producto por codigo propio de cada uno
router.get('/product/getByCode/:codigo', ProductController.getProductoByCode);
// Productos por la categoria a la que pertenencen
router.get('/product/getByCategoria/:categoria', ProductController.getProductsByCategoria);
// Productos por el ID
router.get('/product/getById/:id', ProductController.getProductoByID);
// Productos por el precio minimo
router.get('/product/precio_min=:min', ProductController.getProductByPrice);
// Añadir un producto por URL
router.get('/product/add/:codigo/:categoria/:nombre/:precio/:descripcion/:stock/:url', ProductController.createProductURL);
// Eliminar por URL
router.get('/product/delete/:id', ProductController.deleteProductURL);
// Actualizar por URL
router.get('/product/update/:id/:stock/:nombre/:descripcion/:url', ProductController.updateProductURL);



module.exports = router;
export default router;