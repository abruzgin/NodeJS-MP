import Sequelize from 'sequelize';
import users from './../models/users';
import products from './../models/products';
import { dbConfig } from './';

const dbEnv = dbConfig[process.env.SQL_DB_ENV] || dbConfig.development;
const { dialect, username, host, port, password, database } = dbEnv;

const db = {};
const sequelize = new Sequelize(`${dialect}://${username}:${password}@${host}:${port}/${database}`);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.users = users(sequelize, Sequelize);
db.products = products(sequelize, Sequelize);

// provide the associations if necessary

export default db;