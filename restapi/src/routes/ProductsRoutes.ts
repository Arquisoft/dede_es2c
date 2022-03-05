const express = require("express");
import * as ProductController from '../controllers/ProductController';

const router = express.Router();

router.get('/product/lista', ProductController.findProducts);

module.exports=router;

export default router;