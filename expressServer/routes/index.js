import express from 'express';
import products from './products';
import users from './users';
import auth from "./auth";
import cities from './cities';

import tokenVerifier from "../middlewares/tokenVerifier"

export default function(app) {
  app.use('/api/auth', auth);
  
  app.use('/api', tokenVerifier);
  app.use('/api/products', products);
  app.use('/api/users', users);
  app.use('/api/cities', cities);
}