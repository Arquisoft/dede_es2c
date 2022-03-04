import express, {Request, Response, Router} from 'express';
import * as ProductController from './ProductController';

const router = express.Router();


router.get('/products/lista', ProductController.getAllProducts);
router.get('/products/findByCategoria/:categoria', ProductController.getProductsByCategoria);
router.get('/products/findByCodigo/:codigo', ProductController.getProductoByCode);

export default router;