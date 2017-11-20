import mongoose from './../config/mongoose';

const Schema = mongoose.Schema;

const usersSchema = new Schema({
  username: {
    type: String,
    required: true,
    minlength: [3, 'Name too short']
  },
  email: {
    type: String,
    required: true,
    minlength: [5, 'Email too short'],
    validate: {
      validator(val) {
        return /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(val);
      },
      message: '{VALUE} is a not valid email'
    }
  },
  password: {
    type: String,
    required: true,
    minlength: [5, 'Password too short'],
    maxlength: [20, 'Password too long']
  }
});

export default mongoose.model('User', usersSchema);