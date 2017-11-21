import express from 'express';
import products from './products';
import users from './users';
import auth from "./auth";
import citiesMongo from './cities_mongo';
import productsMongo from './products_mongo';
import usersMongo from './users_mongo';

import tokenVerifier from "../middlewares/tokenVerifier"

export default function(app) {
  app.use('/api/auth', auth);
  
  app.use('/api', tokenVerifier);
  app.use('/api/products', products);
  app.use('/api/users', users);
  app.use('/api/mongo/cities', citiesMongo);
  app.use('/api/mongo/products', productsMongo);
  app.use('/api/mongo/users', usersMongo);
}