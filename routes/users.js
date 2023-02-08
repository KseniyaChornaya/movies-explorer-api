const router = require('express').Router();
const {
  getUserMe,
  updateUserInfo,
} = require('../controllers/user');
const { validateUserInfo } = require('../utils/validations/user-validation');

router.get('/me', getUserMe);
router.patch('/me', validateUserInfo, updateUserInfo);

module.exports = router;
