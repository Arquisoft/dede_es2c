const express = require("express");
import * as ProductOrderController from '../controllers/ProductOrderController';
const router = express.Router();


//********* PRODUCTOS EN PEDIDOS **********//

//**** GENERAR ****

router.get('/productOrder/generateExample', ProductOrderController.generateExample);


//**** POST ****

// Añadir un producto en un pedido por URL
router.get('/productOrder/add/:id_product/:cantidad/:id_order', ProductOrderController.addProductOrderURL);
// Eliminar un producro en un pedido por URL
router.get('/productOrder/delete/:id', ProductOrderController.deleteProductOrderURL);
// Actualizar un producto en un pedido por URL
router.get('/productOrder/update/:id/:cantidad', ProductOrderController.updateProductOrderURL);


//**** GET ****

// Listar productos en pedido
router.get('/productOrder/list', ProductOrderController.getProductOrders)
// Hallar producto en pedido por el ID
router.get('/productOrder/getById/:id', ProductOrderController.getProductOrderByID);

module.exports = router;
export default router;