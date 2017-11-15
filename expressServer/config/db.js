import Sequelize from 'sequelize';
import users from './../models/users';
import products from './../models/products';

const db = {};
const sequelize = new Sequelize("postgres://Aliaksandr_Bruzgin:1111@127.0.0.1:5432/NodeJS_MP_dev");

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.users = users(sequelize, Sequelize);
db.products = products(sequelize, Sequelize);

// provide the associations if necessary

export default db;