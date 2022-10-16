const express = require('express');
const {
  validateUpdateUser,
  validateCreateUser,
  validateLogin,
  validateCreateMovie,
  validateMovieId,
} = require('../middlewares/errorValidator');
const NotFound = require('../errors/notFound');
const auth = require('../middlewares/auth');

const router = express.Router();
const {
  updateUser, aboutMe, login, createUser,
} = require('../controllers/users');

const {
  getMovies, delMovieById, createMovie,
} = require('../controllers/movies');

router.post('/signin/', validateLogin, login);
router.post('/signup/', validateCreateUser, createUser);

router.get('/users/me', auth, aboutMe);
router.patch('/users/me', auth, validateUpdateUser, updateUser);

router.get('/movies', auth, getMovies);
router.post('/movies', auth, validateCreateMovie, createMovie);
router.delete('/movies/:movieId', auth, validateMovieId, delMovieById);

router.all('*', (req, res, next) => {
  next(new NotFound('Страница не найдена'));
});

module.exports = router;
