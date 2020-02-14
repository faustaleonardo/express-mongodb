const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: [true, 'Username must be filled']
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'Email must be filled']
  },
  firstname: { type: String, required: [true, 'Firstname must be filled'] },
  lastname: { type: String, required: [true, 'Lastname must be filled'] },
  age: { type: Number, required: [true, 'Age must be filled'] },
  job: { type: String },
  profileImage: { type: String },
  createdAt: { type: Date, default: Date.now(), select: false }
});

const userModel = mongoose.model(userSchema, 'User');

module.exports = userModel;
