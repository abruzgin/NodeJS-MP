import Product from '../models/products_mongo';

export const getAllProducts = (req, res) => {
  Product.find({}, (err, products) => {
    if (err) return res.send(`Error: ${err}`);
    return res.send(products);
  });
}

export const getSingleProduct = (req, res) => {
  const { id } = req.params;
  Product.findById(id, (err, product) => {
    if (err) return res.send(`Error: ${err}`);
    return res.send(product);
  });
}

export const removeProduct = (req, res) => {
  const { id: _id } = req.params;
  Product.remove({ _id }, (err, product) => {
    if (err) return res.send(`Error: ${err}`);
    return res.send("Product successfully deleted");
  });
}

export const getProductReviews = (req, res) => {
  const { id } = req.params;
  Product.findById(id, (err, product) => {
    if (err) return res.send(`Error: ${err}`);
    return res.send(product.reviews);
  });
}

export const createProduct = (req, res) => {
  const { name, brand, price, options, reviews } = req.body;
  Product.create({
    name, brand, price, options, reviews
  }, (err, product) => {
    if (err) return res.send(`Error: ${err}`);
    return res.send(product);
  })
}