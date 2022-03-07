const express = require("express");
import * as OrderController from '../controllers/OrderController';

const router = express.Router();

// Busca todos
router.get('/order/list', OrderController.getOrders);

// Para tests
router.get('/order/message', OrderController.getMessage);

module.exports = router;

export default router;

