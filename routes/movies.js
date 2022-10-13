const express = require('express');
const { validateCreateMovie, validateMovieId } = require('../middlewares/errorValidator');
const NotFound = require('../errors/notFound');

const moviesRouter = express.Router();
const {
  getMovies, delMovieById, createMovie,
} = require('../controllers/movies');

moviesRouter.get('/movies', getMovies);
moviesRouter.post('/movies', validateCreateMovie, createMovie);
moviesRouter.delete('/movies/:movieId', validateMovieId, delMovieById);
moviesRouter.all('*', (req, res, next) => {
  next(new NotFound('Страница не найдена'));
});
module.exports = moviesRouter;
