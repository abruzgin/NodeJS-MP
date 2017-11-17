import Sequelize from 'sequelize';
import users from './../models/users';
import products from './../models/products';
import { dbConfig } from './';

const dbEnv = dbConfig[process.env.SQL_DB_ENV] || dbConfig.development;
const { dialect, username, host, port, password, database } = dbEnv;

const sequelize = new Sequelize(`${dialect}://${username}:${password}@${host}:${port}/${database}`);
const db = {
  sequelize,
  Sequelize,
  users: users(sequelize, Sequelize),
  products: products(sequelize, Sequelize)
};

// provide the associations if necessary

export default db;