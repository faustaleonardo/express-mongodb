const express = require('express');

const {
  getYoungUsers,
  getAllUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser
} = require(`./../controllers/userController`);
const router = express.Router();

router.route('/young-users').get(getYoungUsers);

router
  .route('/')
  .get(getAllUsers)
  .post(createUser);

router
  .route('/:id')
  .get(getUser)
  .patch(updateUser)
  .delete(deleteUser);

module.exports = router;
