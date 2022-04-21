const express = require("express");
import * as ReviewController from '../controllers/ReviewController';
const router = express.Router();


// Añadir una review
router.post('/review/addReview', ReviewController.addReview);
// Obtener las reviews de un producto
router.get('/review/getByCode/:codigo', ReviewController.getReviewsByProduct);
// Obtener una review concreta
router.get('/review/getByEmailAndCode/:email/:codigo', ReviewController.getReviewByUserAndProduct);
// Eliminar una review concreta
router.get('/review/deleteByEmailAndCode/:email/:codigo', ReviewController.deleteReviewByUserAndProduct);

module.exports = router;
export default router;