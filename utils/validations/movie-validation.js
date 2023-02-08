const { Joi, celebrate } = require('celebrate');
const { UrlRegExp } = require('../constants');

module.exports.validateMovieId = celebrate({
  params: Joi.object().keys({
    _id: Joi.string().required().hex().length(24),
  }),
});

module.exports.validateMovieInfo = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().pattern(UrlRegExp),
    trailerLink: Joi.string().required().pattern(UrlRegExp),
    thumbnail: Joi.string().required().pattern(UrlRegExp),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});
