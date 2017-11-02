import express from 'express';
import products from './products';
import users from './users';

export default function(app) {
  app.use('/api/products', products);
  app.use('/api/users', users);
}