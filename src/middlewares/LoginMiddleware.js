const loginSchema = require('./loginSchema');

function validateLogin(req, res, next) {

    const Login = req.body;
    const isValid = loginSchema(Login);
    if (!isValid) {
      return res.status(400).json(loginSchema.errors);
    }
    next();
  }

  module.exports = validateLogin;