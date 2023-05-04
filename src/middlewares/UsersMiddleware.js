const usersSchema = require('./usersSchema');

function validateUser(req, res, next) {

    const User = req.body;
    const isValid = usersSchema(User);
    if (!isValid) {
      return res.status(400).json(usersSchema.errors);
    }
    next();
  }

  module.exports = validateUser;