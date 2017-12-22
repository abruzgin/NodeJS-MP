const mongoose = require('./../config/mongoose') ;

const Schema = mongoose.Schema;

const citiesSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  country: {
    type: String,
  },
  capital: {
    type: Boolean,
    default: false
  },
  location: {
    lat: {
      type: Number,
      default: 0
    },
    long: {
      type: Number,
      default: 0
    } 
  },
  lastModifiedDate: Date
});

citiesSchema.pre('save', function (next){
  const date = new Date();
  this.lastModifiedDate = date;
  next();
})

module.exports = mongoose.model('City', citiesSchema);
// export default mongoose.model('City', citiesSchema);