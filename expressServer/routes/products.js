import express from "express";
import * as products from '../controllers/products';

const router = express.Router();

router.route('/')
  .get(products.getAllProducts)
  .post(products.createProduct);
router.get('/:id', products.getSingleProduct);
router.get('/:id/reviews', products.getProductReviews);

export default router;