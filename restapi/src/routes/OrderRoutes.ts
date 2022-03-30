const express = require("express");
import * as OrderController from '../controllers/OrderController';
const router = express.Router();


// Generar ejemplo
router.get('/order/generateExample', OrderController.generateExample);
// Busca todos
router.get('/order/list', OrderController.getOrders);
// Buscar pedido por codigo
router.get('/order/getByCode/:codigo', OrderController.getOrderByCode);
// Buscar pedido por correo
router.get('/order/getByEmail/:email', OrderController.getOrderByEmail);


module.exports = router;
export default router;