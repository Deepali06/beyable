const router = require('express').Router();
let userController = require('./userController.js');
const passport = require('passport');

router.post('/login', passport.authenticate('local'), userController.login);
router.post('/signup', userController.signUp);
router.post('/verifyEmail', userController.verifyEmail);
router.get('/redirectVerifyEmail', userController.redirectVerifyEmail);

module.exports = router;
