import express, {Request, Response, Router} from 'express';
import * as ProductController from '../controllers/ProductController';

const router = express.Router();


router.get('/product/list', ProductController.getAllProducts);
router.get('/products/findByCategoria/:categoria', ProductController.getProductsByCategoria);
router.get('/products/findByCodigo/:codigo', ProductController.getProductoByCode);

module.exports=router;

export default router;