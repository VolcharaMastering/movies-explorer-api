/* eslint-disable no-useless-escape */
const { celebrate, Joi } = require('celebrate');
const { ObjectId } = require('mongoose').Types;

const validId = (value, helpers) => {
  if (!ObjectId.isValid(value)) {
    return helpers.error('any.invalid');
  }
  return value;
};

const validLink = (value, helpers) => {
  if (!/https?\:\/\/(www\.)?[a-zA-Z0-9\-\.\_\~\:\/\?\#\[\]\@\!\$\&\'\(\)\*\+\,\;\=]+\#?$/.test(value)) {
    return helpers.error('any.invalid');
  }
  return value;
};

const validRuName = (value, helpers) => {
  if (!/[а-яА-Я0-9\-\.\_\~\:\/\?\#\[\]\@\!\$\&\'\(\)\*\+\,\;\=]+\#?$/.test(value)) {
    return helpers.error('any.invalid');
  }
  return value;
};

const validEnName = (value, helpers) => {
  if (!/[a-zA-Z0-9\-\.\_\~\:\/\?\#\[\]\@\!\$\&\'\(\)\*\+\,\;\=]+\#?$/.test(value)) {
    return helpers.error('any.invalid');
  }
  return value;
};

const validateCreateUser = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().min(2).max(30),
  }),
});

const validateLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});

const validateUserId = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().required().custom(validId),
  }),
});

const validateUpdateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
});

const validateCreateMovie = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required().min(2).max(60),
    director: Joi.string().required().min(2).max(60),
    duration: Joi.number().required(),
    year: Joi.string().required().min(2).max(60),
    description: Joi.string().required().min(2),
    image: Joi.string().required().custom(validLink),
    trailerLink: Joi.string().required().custom(validLink),
    thumbnail: Joi.string().required().custom(validLink),
    movieId: Joi.string().required().custom(validId),
    nameRU: Joi.string().required().custom(validRuName),
    nameEN: Joi.string().required().custom(validEnName),
  }),
});

const validateMovieId = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().required().custom((value, helpers) => {
      if (!ObjectId.isValid(value)) {
        return helpers.error('any.invalid');
      }
      return value;
    }),
  }),
});

module.exports = {
  validateLogin,
  validateCreateUser,
  validateUserId,
  validateUpdateUser,
  validateCreateMovie,
  validateMovieId,
};
