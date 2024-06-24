const User = require('../models/users');

exports.addUser = (req, res) => {
  const { username, password } = req.body;

  const user = User.addUser(username, password);
};
