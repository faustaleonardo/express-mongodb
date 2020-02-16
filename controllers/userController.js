const User = require('./../models/userModel');
const APIFeatures = require('./../utils/apiFeatures');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(User.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const { query } = features;

  const users = await User.find(query);

  res.status(200).json({
    status: 'success',
    data: {
      results: users.length,
      users
    }
  });
});

exports.createUser = catchAsync(async (req, res) => {
  const newUser = await User.create(req.body);
  res.status(201).json({
    status: 'success',
    data: { user: newUser }
  });
});

exports.getUser = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findById(id);
  if (!user) {
    return next(new AppError('User is not found with that ID', 404));
  }
  res.status(201).json({
    status: 'success',
    data: { user }
  });
});

exports.updateUser = catchAsync(async (req, res) => {
  const { id } = req.params;
  const user = await User.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true
  });
  res.status(201).json({
    status: 'success',
    data: { user }
  });
});

exports.deleteUser = catchAsync(async (req, res) => {
  const { id } = req.params;
  await User.findByIdAndDelete(id);
  res.status(204).json({
    status: 'success',
    data: null
  });
});

exports.getYoungUsers = catchAsync(async (req, res) => {
  const stats = await User.aggregate([
    {
      $match: { age: { $lte: 30 } }
    },
    {
      $group: {
        _id: '$age',
        numCoders: { $sum: 1 },
        averageAge: { $avg: '$age' },
        youngestAge: { $min: '$age' },
        oldestAge: { $max: '$age' }
      }
    },
    {
      $addFields: { age: '$_id' }
    },
    {
      $project: {
        _id: 0
      }
    },
    {
      $sort: { youngestAge: 1 }
    }
  ]);

  res.status(200).json({
    status: 'success',
    data: {
      stats
    }
  });
});
