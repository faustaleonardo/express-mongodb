const express = require('express');

const {
  checkID,
  checkBody,
  getAllUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser
} = require(`./../controllers/userController`);
const router = express.Router();

router.param('id', checkID);

router
  .route('/')
  .get(getAllUsers)
  .post(checkBody, createUser);

router
  .route('/:id')
  .get(getUser)
  .patch(updateUser)
  .delete(deleteUser);

module.exports = router;
