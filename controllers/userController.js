const users = [
  {
    id: 1,
    name: 'Fausta',
    age: 25
  }
];

exports.checkID = (req, res, next, value) => {
  const id = value;
  const user = users.find(el => el.id === id * 1);
  if (!user) {
    return res.status(404).json({
      status: 'fail',
      message: 'User not found'
    });
  }

  next();
};

exports.checkBody = (req, res, next) => {
  const { name, age } = req.body;

  if (!name || !age) {
    return res.status(400).json({
      status: 'fail',
      message: 'Name or age is missing!'
    });
  }

  next();
};

exports.getAllUsers = (req, res, next) => {
  res.status(200).json({
    status: 'success',
    data: {
      results: users.length,
      users
    }
  });
};

exports.createUser = (req, res, next) => {
  const { name, age } = req.body;

  const newUser = {
    id: users[users.length - 1].id + 1,
    name,
    age
  };
  users.push(newUser);

  res.status(201).json({
    status: 'success',
    data: { newUser }
  });
};

exports.getUser = (req, res, next) => {
  const { id } = req.params;
  const user = users.find(el => el.id === id * 1);

  res.status(200).json({
    status: 'success',
    data: { user }
  });
};

exports.updateUser = (req, res, next) => {
  res.status(200).json({
    status: 'success',
    data: {
      user: 'User updated'
    }
  });
};

exports.deleteUser = (req, res, next) => {
  res.status(204).json({
    status: 'success',
    data: null
  });
};
