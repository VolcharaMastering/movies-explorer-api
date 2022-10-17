const NotFound = require('../errors/notFound');
const PermissionError = require('../errors/permissionError');
const IncorrectData = require('../errors/requestError');
const ServerError = require('../errors/serverError');
const Movie = require('../models/Movie');

const { OK_CODE, CODE_CREATED } = require('../states/states');

const getMovies = async (req, res, next) => {
  try {
    const movies = await Movie.find({}).sort([['createdAt', -1]]);
    res.status(OK_CODE).send(movies);
  } catch (e) {
    next(new ServerError('Произошла ошибка на сервере'));
  }
};

const delMovieById = async (req, res, next) => {
  const { movieId } = req.params;
  const myId = req.user._id;
  try {
    const movie = await Movie.findById(movieId);
    if (!movie) {
      next(new NotFound('Нет такого фильма'));
      return;
    }
    if (JSON.stringify(movie.owner) === JSON.stringify(myId)) {
      await Movie.findByIdAndDelete(movieId);
      res.status(OK_CODE).send(movie);
    } else {
      next(new PermissionError('У вас не достаточно прав для удаления фильма'));
      return;
    }
  } catch (e) {
    if (e.name === 'CastError') {
      next(new IncorrectData('Невалидный id '));
      return;
    }
    next(new ServerError('Произошла ошибка на сервере'));
  }
};
const createMovie = async (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;
  try {
    const movie = await new Movie({
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      thumbnail,
      movieId,
      owner: req.user._id,
      nameRU,
      nameEN,
    }).save();
    res.status(CODE_CREATED).send(movie);
  } catch (e) {
    if (e.errors.name) {
      if (e.errors.name.name === 'ValidatorError') {
        next(new IncorrectData('Запрос не прошёл валидацию'));
        return;
      }
    }
    if (e.errors.link) {
      if (e.errors.link.name === 'ValidatorError') {
        next(new IncorrectData('Запрос не прошёл валидацию'));
        return;
      }
    }
    next(new ServerError('Произошла ошибка на сервере'));
  }
};

module.exports = {
  getMovies,
  delMovieById,
  createMovie,
};
