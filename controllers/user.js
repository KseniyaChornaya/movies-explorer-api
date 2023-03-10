const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { JWT_SECRET, NODE_ENV } = process.env;
const User = require('../models/User');
const NotFoundError = require('../errors/not-found-error');
const ConflictError = require('../errors/conflict-error');
const BadRequestError = require('../errors/bad-request-error');

module.exports.login = (req, res, next) => User
  .findUserByCredentials(req.body.email, req.body.password)
  .then((user) => {
    const userToken = jwt
      .sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev_secret', { expiresIn: '7d' });
    res
      .send({ userToken });
  }).catch((err) => {
    next(err);
  });

module.exports.createUser = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then((hash) => User.create({
      name: req.body.name,
      email: req.body.email,
      password: hash,
    }))
    .then((user) => {
      res.send({
        user: {
          email: user.email,
          name: user.name,
        },
      });
    })
    .catch((err) => {
      if (err.code === 11000) {
        next(new ConflictError('Такой пользователь уже существует'));
      } else if (err.name === 'ValidationError') {
        next(new BadRequestError('Отправлены некорректные данные'));
      } else {
        next(err);
      }
    });
};

module.exports.getUserMe = (req, res, next) => {
  User.findOne({ _id: req.user._id })
    .orFail(new NotFoundError('Пользователь не найден'))
    .then((user) => {
      res.send(user);
    })
    .catch(next);
};

module.exports.updateUserInfo = (req, res, next) => {
  User.findByIdAndUpdate(req.user._id, {
    name: req.body.name,
    email: req.body.email,
  }, {
    new: true,
    runValidators: true,
  })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.code === 11000) {
        next(new ConflictError('Необходимо ввести новые данные'));
      } else if (err.name === 'ValidationError') {
        next(new BadRequestError('Отправлены некорректные данные'));
      } else {
        next(err);
      }
    });
};
