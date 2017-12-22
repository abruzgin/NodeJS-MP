const mongoose = require("mongoose");

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/NodeJS_MP_dev");

const db = mongoose.connection;

db.on('error', (err) => console.info('connection error: ', err.message));
db.on('open', () => console.info('Connected to MongoDB'));

module.exports = mongoose;