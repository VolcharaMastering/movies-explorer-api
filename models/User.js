/* eslint-disable linebreak-style */
/* eslint-disable no-useless-escape */
const mongoose = require('mongoose');
const validMail = require('validator');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Поле email должно быть заполнено'],
    unique: true,
    validate: {
      validator(val) {
        return validMail.isEmail(val);
      },
      message: 'Проверьте формат почты',
    },
  },
  password: {
    type: String,
    required: [true, 'Поле password должно быть заполнено'],
    minlength: [6, 'Длина пароль не меньше 6ти символов'],
    select: false,
  },

  name: {
    type: String,
    required: [true, 'Поле Имя должно быть заполнено'],
    minlength: [2, 'Длина имени не меньше 2х символов'],
    maxlength: [30, 'Длина имени не более 30 символов'],
  },
});

// eslint-disable-next-line func-names
userSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.password;
  return user;
};

module.exports = mongoose.model('user', userSchema);
