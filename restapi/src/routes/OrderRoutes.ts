const express = require("express");
import * as OrderController from '../controllers/OrderController';
const router = express.Router();


//********* PEDIDOS **********//

//**** GENERAR ****
router.get('/order/generateExample', OrderController.generateExample);

//**** POST ****

// Añadir un producto por URL
router.get('/order/add/:codigo/:correo/:direccion/:fecha/:precioTotal/:productos', OrderController.addOrderURL);
// Eliminar por URL
router.get('/order/delete/:codigo', OrderController.deleteOrderURL);
// Actualizar por URL
router.get('/order/update/:codigo/:direccion', OrderController.updateOrderURL);



//**** GET ****

// Busca todos
router.get('/order/list', OrderController.getOrders);
// Buscar pedido por codigo
router.get('/order/getByCode/:codigo', OrderController.getOrderByCode);
// Buscar pedido por correo
router.get('/order/getByEmail/:email', OrderController.getOrderByEmail);
// Buscar pedido por precio
router.get('/order/getByPrice/:price', OrderController.getOrderByPrice);
// Buscar pedido por direccion
router.get('/order/getByDirection/:dir', OrderController.getOrderByDirection);
// Buscar pedido por fecha
router.get('/order/getByDate/:date', OrderController.getOrderByDate);


module.exports = router;
export default router;