export const getAllProducts = (req, res) => {
  return res.send('get all products');
}

export const getSingleProduct = (req, res) => {
  const { id } = req.params;
  return res.send(`get product with id=${id}`);
}

export const getProductReviews = (req, res) => {
  const { id } = req.params;
  return res.send(`Get all reviews for product with id=${id}`);
}

export const createProduct = (req, res) => {
  return res.send(`Create product`);
}