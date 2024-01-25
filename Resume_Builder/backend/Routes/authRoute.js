const express = require('express');
const { login, signup, checkUser } = require('../controllers/authController');
const { body } = require('express-validator');

const router = express.Router();
const app = express();
app.use(express.json());

router
  .route("/login")
  .post(
    [
      body('email', 'Enter a valid email').isEmail(),
      body('password', 'Enter the correct password').exists()
    ],
    login
    );

router
    .route('/signup')
    .post(
      [
        body('username', 'Enter the Username').exists(),
        body('email', 'Enter a valid email').isEmail(),
        body('password', 'Enter the correct password').exists()
      ],
      signup
    );
router
    .route("/checkuser")
    .post(
      [
        body('email', 'Enter a valid email').isEmail(),
      ],
      checkUser
      );
module.exports = router;