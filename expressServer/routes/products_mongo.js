import express from 'express';
import * as products from '../controllers/products_mongo';
const router = express.Router();

router.route("/")
  .get(products.getAllProducts)
  .post(products.createProduct);

router.route("/:id")
  .get(products.getSingleProduct)
  .delete(products.removeProduct);

router.route("/:id/reviews")
  .get(products.getProductReviews);

export default router;
