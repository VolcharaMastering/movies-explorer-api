const errorHandler = (err, req, res, next) => {
  const { code = 500, message } = err;
  if (code === 500) {
    res.status(code).send('Произошла ошибка на сервере');
  } else {
    res.status(code).send(message);
  }
  next();
};
module.exports = errorHandler;
