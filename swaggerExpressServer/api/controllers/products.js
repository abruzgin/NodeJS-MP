'use strict';

const Product = require("../../../expressServer/models/cities_mongo");

function getAllProducts(req, res) {
  debugger;
  Product.find({}, (err, products) => {
    if (err) return res.json({Error: err});
    return res.json(products);
  });
}
function createProduct(req, res) {
  const { name, brand, price, options, reviews } = req.swagger.params.body.value;
  Product.create({
    name, brand, price, options, reviews
  }, (err, product) => {
    if (err) return res.json({Error: err});
    return res.json(product);
  })
}
function getProduct(req, res) {
  const id = req.swagger.params.id.value;
  Product.findById(id, (err, product) => {
    if (err) return res.json({Error: err });
    return res.json(product)
  });
}
function deleteProduct(req, res) {
  const _id = req.swagger.params.id.value;
  console.log(_id)
  Product.remove({ _id }, (err, product) => {
    if (err) return res.json({Error: err });
    return res.json({message: "Product successfully deleted"});
  });
}
function getProductReviews(req, res) {
  const id = req.swagger.params.id.value;
  Product.findById(id, (err, product) => {
    if (err) return res.json({Error: err });
    return res.json(product.reviews);
  });
}

module.exports = {
  getAllProducts: getAllProducts,
  createProduct: createProduct,
  getProduct: getProduct,
  deleteProduct: deleteProduct,
  getProductReviews: getProductReviews
};