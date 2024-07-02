const mongoose = require('mongoose');
const User = require('./models/usersModel');

async function addDefaultUsers() {
  const defaultUsers = [
    { username: 'Tom Sasson', password: 'tom2002!A', nickname: 'Tom the king', avatar: '/localPhotos/Tom.png' },
    { username: 'Alon Livne', password: 'alom2002!A', nickname: 'Alon the king', avatar: '/localPhotos/Alon.png' },
    { username: 'Maayan Ifergan', password: 'maayan2002!A', nickname: 'Maayan the Queen', avatar: '/localPhotos/Maayan.png' }
  ];

  const userIds = {};

  for (const userData of defaultUsers) {
    try {
      let user = await User.findOne({ username: userData.username });
      if (!user) {
        user = await User.createUser(userData);
        console.log(`Default user added: ${userData.username}`);
      }
      userIds[userData.username] = user._id;
    } catch (error) {
      console.error(`Error adding default user: ${error.message}`);
    }
  }

  return userIds;
}

module.exports = addDefaultUsers;