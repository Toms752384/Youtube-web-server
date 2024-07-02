const mongoose = require('mongoose');
const User = require('./models/usersModel');

// פונקציה להוספת משתמשי ברירת מחדל
async function addDefaultUsers() {
  const defaultUsers = [
    { username: 'Tom Sasson', password: 'tom2002!A', nickname: 'Tom the king', avatar: '/localPhotos/Tom.png' },
    { username: 'Alon Livne', password: 'alom2002!A', nickname: 'Alon the king', avatar: '/localPhotos/Alon.png' },
    { username: 'Maayan Ifergan', password: 'maayan2002!A', nickname: 'Maayan the Queen', avatar: '/localPhotos/Maayan.png' }
  ];

  for (const userData of defaultUsers) {
    try {
      const existingUser = await User.findOne({ username: userData.username });
      if (!existingUser) {
        await User.createUser(userData);
        console.log(`Default user added: ${userData.username}`);
      }
    } catch (error) {
      console.error(`Error adding default user: ${error.message}`);
    }
  }
}

mongoose.connect('mongodb://localhost:27017/ourDatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
  addDefaultUsers().then(() => {
    console.log('Default users added');
    mongoose.disconnect();
  });
}).catch(err => {
  console.error('Failed to connect to MongoDB', err);
});
