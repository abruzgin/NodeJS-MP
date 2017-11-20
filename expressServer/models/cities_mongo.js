import mongoose from './../config/mongoose';

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
  }
});

export default mongoose.model('City', citiesSchema);