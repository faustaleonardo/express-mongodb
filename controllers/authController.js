const jwt = require('jsonwebtoken');
const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');

const signJwtToken = id => {
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
};

exports.signup = catchAsync(async (req, res, next) => {
  const {
    username,
    email,
    password,
    passwordConfirm,
    firstname,
    lastname,
    age,
    job,
    profileImage
  } = req.body;

  const newUser = await User.create({
    username,
    email,
    password,
    passwordConfirm,
    firstname,
    lastname,
    age,
    job,
    profileImage
  });

  const token = signJwtToken(newUser._id);

  res.status(201).json({
    status: 'success',
    data: {
      user: newUser,
      token
    }
  });
});
