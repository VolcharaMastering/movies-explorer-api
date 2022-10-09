/* eslint-disable linebreak-style */
const express = require('express');
// const { validateUpdateUser } = require('../middlewares/errorValidator');
// const NotFound = require('../errors/notFound');

const userRouter = express.Router();
const {
  updateUser, aboutMe,
} = require('../controllers/users');

userRouter.get('/me', aboutMe);
userRouter.patch('/me', updateUser);
// userRouter.patch('/me', validateUpdateUser, updateUser);
// userRouter.use('*', (req, res, next) => {
//   next(new NotFound('Страница не найдена'));
// });
module.exports = userRouter;
