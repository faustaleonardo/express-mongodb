const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: [true, 'Please provide an username'],
    minlength: [5, 'Username must be at least 5 characters'],
    maxlength: [15, 'Username must be at most 15 characters']
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'Please provide an email'],
    validate: [validator.isEmail, 'Please provide a valid email']
  },
  password: {
    type: String,
    required: [true, 'Please provide your password'],
    minlength: 8,
    select: false
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password'],
    validate: {
      validator: function(val) {
        return val === this.password;
      },
      message: 'Your password does not match'
    }
  },
  firstname: {
    type: String,
    required: [true, 'Please provide your firstname']
  },
  lastname: { type: String, required: [true, 'Please provide your lastname'] },
  age: { type: Number, required: [true, 'Please provide your age'] },
  job: { type: String },
  profileImage: { type: String },
  createdAt: { type: Date, default: Date.now(), select: false }
});

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;
