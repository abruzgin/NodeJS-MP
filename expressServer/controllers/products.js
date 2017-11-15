import db from './../config/db';

export const getAllProducts = (req, res) => {
  return db.products.findAll()
      .then(products => {
        return res.send(`get all products ${JSON.stringify(products)}`);
      })
      .catch(err => res.send(`Error: ${err}`));
}

export const getSingleProduct = (req, res) => {
  const { id } = req.params;
  return db.products.findById(id)
    .then(product => {
      return res.send(`get product with id=${id} ${JSON.stringify(product)}`);
    })
    .catch(err => res.send(`Error: ${err}`))
}

export const getProductReviews = (req, res) => {
  const { id } = req.params;
  return db.products.findById(id)
    .then(product => {
      return res.send(`get product reviews with id=${id} ${JSON.stringify(product.reviews)}`);
    })
    .catch(err => res.send(`Error: ${err}`))
}

export const createProduct = (req, res) => {
  const { name, brand, price, options, reviews } = req.body;
  return db.products.create({ name, brand, price, options, reviews })
    .then(product => res.send(`New product ${JSON.stringify(product)}`))
    .catch(err => res.send(`Error: ${err}`))
}