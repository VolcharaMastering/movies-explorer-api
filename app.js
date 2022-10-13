require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const helmet = require('helmet');
const cors = require('cors');
const userRouter = require('./routes/users');
const moviesRouter = require('./routes/movies');
const { createUser, login } = require('./controllers/users');
const auth = require('./middlewares/auth');
const rateLimit = require('./utils/rateLimit');
const { validateLogin, validateCreateUser } = require('./middlewares/errorValidator');
const errorHandler = require('./middlewares/errorHandler');
const NotFound = require('./errors/notFound');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000, NODE_ENV, MONGO_URL } = process.env;
const app = express();

app.use(cors());
app.use(express.json());
app.use(helmet());

app.use(requestLogger);

app.use(rateLimit);

app.post('/signin/', validateLogin, login);
app.post('/signup/', validateCreateUser, createUser);

app.use(auth, userRouter);
app.use(auth, moviesRouter);

app.use('*', (req, res, next) => {
  next(new NotFound('Страница не найдена'));
});

app.use(errorLogger);

app.use(errors());
app.use(errorHandler);

async function connect() {
  await mongoose.connect(NODE_ENV === 'production' ? MONGO_URL : 'mongodb://localhost:27017/moviesdb', {
    useNewUrlParser: true,
    useUnifiedTopology: false,
  });

  await app.listen(PORT);
}

connect();
