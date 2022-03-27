const express = require("express");
import * as ProductController from '../controllers/ProductController';
import * as OrderController from '../controllers/OrderController';
import * as ProductOrderController from '../controllers/ProductOrderController';

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



//********* PEDIDOS **********//

// Guardar un pedido
router.get('/order/generateExample', OrderController.generateExample);
// Busca todos
router.get('/order/list', OrderController.getOrders);
// Buscar pedido por codigo
router.get('/order/getByCode/:codigo', OrderController.getOrderByCode);
// Buscar pedido por correo
router.get('/order/getOrderByEmail/:email', OrderController.getOrderByEmail);
// Buscar pedido por precio
router.get('/order/getByPrice/:price', OrderController.getOrderByPrice);
// Buscar pedido por direccion
router.get('/order/getByDirection/:dir', OrderController.getOrderByDirection);
// Buscar pedido por fecha
router.get('/order/getByDate/:date', OrderController.getOrderByDate);


//********* PRODUCTOS EN PEDIDOS **********//

router.get('/productOrder/generateExample', ProductOrderController.generateExample);
router.get('/productOrder/list', ProductOrderController.getProductOrders )





module.exports = router;
export default router;