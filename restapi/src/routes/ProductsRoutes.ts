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
router.get('product/getById/:id', ProductController.getProductoByID);



// Consultas del Order

// Busca todos
router.get('/order/list', OrderController.getOrders);

// Buscar pedido por codigo
router.get('/order/getByCode/:codigo', OrderController.getOrderByCode);

// Buscar pedido por id
router.get('/order/getById/:id', OrderController.getOrderByID);

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

// Buscar el pedido asociado a un usuario
router.get('/order/getOrderByIdUser/:idUser', OrderController.getOrderByIdUser);

// Para tests
router.get('/order/message', OrderController.getMessage);

module.exports = router;

export default router;