const express = require("express");
import * as OrderController from '../controllers/OrderController';

const router = express.Router();


// DE MOMENTO ESTO SE MUEVE AL PRODUCTS HASTA QUE SEPA QUÉ LE PASA
//      Lo tengo que hacer así porque si no no puedo hacer nada

// Busca todos
//router.get('/order/list', OrderController.getOrders);

// Para tests
//router.get('/order/message', OrderController.getMessage);

module.exports = router;

export default router;


