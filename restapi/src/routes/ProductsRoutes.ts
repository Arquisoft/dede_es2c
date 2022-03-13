const express = require("express");
import * as ProductController from '../controllers/ProductController';
import * as OrderController from '../controllers/OrderController';

const router = express.Router();

// Busca todos
router.get('/product/list', ProductController.findProducts);
// Producto por codigo propio de cada uno
router.get('/product/getByCode/:codigo', ProductController.getProductoByCode);
// Productos por la categoria a la que pertenencen
router.get('/product/getByCategoria/:categoria', ProductController.getProductsByCategoria);
// Productos por su id, NO FUNCIONA
router.get('/product/getById/:id', ProductController.getProductoByID);

router.get('/product/precio_min=:min', ProductController.getProductByPrice);




// Consultas del Order

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

// Buscar productos por codigo de la fecha
router.get('/order/getProductsByCode/:code', OrderController.getOrderProductsByCode);

// Buscar producto concreto en un pedido concreto
router.get('/order/getConcreteProductByCode/:code/:code2', OrderController.getOrderConcreteProductByCode);



// Para tests
router.get('/order/message', OrderController.getMessage);

// Intento guardar una nueva orden
router.get('/order/addExample', OrderController.addExampleOrder);

module.exports = router;

export default router;