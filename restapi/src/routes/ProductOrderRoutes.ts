const express = require("express");
import * as ProductOrderController from '../controllers/ProductOrderController';
const router = express.Router();


//********* PRODUCTOS EN PEDIDOS **********//

router.get('/productOrder/generateExample', ProductOrderController.generateExample);
router.get('/productOrder/list', ProductOrderController.getProductOrders )


module.exports = router;
export default router;