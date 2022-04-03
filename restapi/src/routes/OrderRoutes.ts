const express = require("express");
import * as OrderController from '../controllers/OrderController';
const router = express.Router();


// Generar ejemplo
router.get('/order/generateExample', OrderController.generateExample);
// Crear un pedido
router.post("/order/addOrder", OrderController.addOrder);
// Busca todos
router.get('/order/list', OrderController.getOrders);
// Buscar pedido por codigo
router.get('/order/getByCode/:codigo', OrderController.getOrderByCode);
// Buscar pedido por correo
router.get('/order/getByEmail/:email', OrderController.getOrderByEmail);
// Buscar todos los pedidos por correo
router.get('/order/getAllByEmail/:email', OrderController.getTotalUserOrderByEmail);


module.exports = router;
export default router;