const mongoose = require('./../config/mongoose') ;

const Schema = mongoose.Schema;

const productsSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: [3, 'Name too short']
  },
  brand: {
    type: String,
    required: true,
    minlength: [3, 'Brand name too short']
  },
  price: {
    type: Number,
    default: 0
  },
  options: {
    type: Array
  },
  reviews: {
    type: Array
  },
  lastModifiedDate: Date
});

productsSchema.pre('save', function (next){
  const date = new Date();
  this.lastModifiedDate = date;
  next();
});
module.exports = mongoose.model('Product', productsSchema);
// export default mongoose.model('Product', productsSchema);