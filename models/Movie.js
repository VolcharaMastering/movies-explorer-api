/* eslint-disable linebreak-style */
/* eslint-disable no-useless-escape */
const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: [true, 'Поле "Страна создания" должно быть заполнено'],
  },
  director: {
    type: String,
    required: [true, 'Поле "Режисёр" должно быть заполнено'],
  },
  duration: {
    type: Number,
    required: [true, 'Поле "год выпуска фильма" должно быть заполнено'],
  },
  year: {
    type: String,
    required: [true, 'Поле "Режисёр" должно быть заполнено'],
  },
  description: {
    type: String,
    required: [true, 'Поле "описание фильма" должно быть заполнено'],
  },
  image: {
    type: String,
    required: [true, 'Поле "ссылка на постер к фильму" должно быть заполнено'],
    validate: {
      validator: (val) => /https?\:\/\/(www\.)?[a-zA-Z0-9\-\.\_\~\:\/\?\#\[\]\@\!\$\&\'\(\)\*\+\,\;\=]+\#?$/.test(val),
      message: 'Проверьте формат ссылки',
    },
  },
  trailerLink: {
    type: String,
    required: [true, 'Поле "ссылка на трейлер к фильму" должно быть заполнено'],
    validate: {
      validator: (val) => /https?\:\/\/(www\.)?[a-zA-Z0-9\-\.\_\~\:\/\?\#\[\]\@\!\$\&\'\(\)\*\+\,\;\=]+\#?$/.test(val),
      message: 'Проверьте формат ссылки',
    },
  },
  thumbnail: {
    type: String,
    required: [true, 'Поле "миниатюрное изображение постера к фильму" должно быть заполнено'],
    validate: {
      validator: (val) => /https?\:\/\/(www\.)?[a-zA-Z0-9\-\.\_\~\:\/\?\#\[\]\@\!\$\&\'\(\)\*\+\,\;\=]+\#?$/.test(val),
      message: 'Проверьте формат ссылки',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'MoviesExplorer',
    required: true,
  },
  nameRU: {
    type: String,
    required: [true, 'Поле "название фильма на русском языке" должно быть заполнено'],
  },
  nameEN: {
    type: String,
    required: [true, 'Поле "название фильма на английском языке" должно быть заполнено'],
  },
});

// eslint-disable-next-line func-names
movieSchema.methods.toJSON = function () {
  const movie = this.toObject();
  delete movie.password;
  return movie;
};

module.exports = mongoose.model('movie', movieSchema);
