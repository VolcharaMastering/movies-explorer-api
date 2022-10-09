/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const AuthError = require('../errors/authError');
const ConflictError = require('../errors/conflictError');
const NotFound = require('../errors/notFound');
const IncorrectData = require('../errors/requestError');
const ServerError = require('../errors/serverError');
const User = require('../models/User');

const { OK_CODE, CODE_CREATED } = require('../states/states');

const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      next(new AuthError('Неверное имя пользователя или пароль'));
      return;
    }
    const validUser = await bcrypt.compare(password, user.password);
    if (!validUser) {
      next(new AuthError('Неверное имя пользователя или пароль'));
      return;
    }
    const token = jwt.sign({
      _id: user._id,
    }, process.env.NODE_ENV === 'production' ? process.env.JWT_SECRET : 'dev-secret');
    res.status(OK_CODE).send({ data: user, token });
  } catch (e) {
    next(new ServerError('Произошла ошибка на сервере'));
  }
};

const aboutMe = async (req, res, next) => {
  const myId = req.user._id;
  try {
    const me = await User.findById(myId);
    if (!me) {
      next(new NotFound('Такого пользователя нет'));
      return;
    }
    res.status(OK_CODE).send(me);
  } catch (e) {
    if (e.name === 'CastError') {
      next(new IncorrectData('Невалидный id', myId));
      return;
    }
    next(new ServerError('Произошла ошибка на сервере'));
  }
};

const createUser = async (req, res, next) => {
  const {
    email,
    password,
    name,
  } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await new User({
      email, password: hashedPassword, name,
    }).save();
    res.status(CODE_CREATED).send({ data: user });
  } catch (e) {
    if (e.code === 11000) {
      next(new ConflictError('Пользователь с таким email уже существует.'));
      return;
    }
    if (e.name === 'ValidatorError') {
      next(new IncorrectData('Запрос не прошёл валидацию'));
      return;
    }

    next(new ServerError('Произошла ошибка на сервере'));
  }
};

const updateUser = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (!user) {
        next(new NotFound('Такого пользователя нет'));
        return;
      }
      res.send(user);
    })
    .catch((e) => {
      if (e.name === 'ValidationError') {
        next(new IncorrectData('Некорректные данные'));
        return;
      }
      next(new ServerError('Произошла ошибка на сервере'));
    });
};

module.exports = {
  login,
  aboutMe,
  createUser,
  updateUser,
};
