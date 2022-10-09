/* eslint-disable linebreak-style */
const express = require('express');
// const { validateCreateMovie, validateMovieId } = require('../middlewares/errorValidator');
// const NotFound = require('../errors/notFound');

const moviesRouter = express.Router();
const {
  getmovies, delMovieById, createMovie,
} = require('../controllers/movies');

moviesRouter.get('/', getmovies);
moviesRouter.post('/', createMovie);
moviesRouter.delete('/:movieId', delMovieById);
// moviesRouter.post('/', validateCreateMovie, createMovie);
// moviesRouter.delete('/:movieId', validateMovieId, delMovieById);
// moviesRouter.all('*', (req, res, next) => {
//   next(new NotFound('Страница не найдена'));
// });
module.exports = moviesRouter;
