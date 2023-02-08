const router = require('express').Router();
const {
  getMovie,
  addNewMovie,
  deleteMovie,
} = require('../controllers/movie');
const { validateMovieInfo, validateMovieId } = require('../utils/validations/movie-validation');

router.get('/', getMovie);
router.post('/', validateMovieInfo, addNewMovie);
router.delete('/:_id', validateMovieId, deleteMovie);

module.exports = router;