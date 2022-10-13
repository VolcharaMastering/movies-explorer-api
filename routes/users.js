const express = require('express');
const { validateUpdateUser } = require('../middlewares/errorValidator');
const NotFound = require('../errors/notFound');

const userRouter = express.Router();
const {
  updateUser, aboutMe,
} = require('../controllers/users');

userRouter.get('/users/me', aboutMe);
userRouter.patch('/users/me', validateUpdateUser, updateUser);
userRouter.use('/users/*', (req, res, next) => {
  next(new NotFound('Страница не найдена'));
});
module.exports = userRouter;
