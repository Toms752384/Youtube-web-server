const users = [
  { "username": "maayan", "password": "maayan", "nickname": "maayanosh", "avatar": "/localPhotos/defualtAvatar.png" }
];

const getUsers = () => users;

//add to users
const addUser = (newUser) => {
  users.push(newUser);
};

module.exports = { getUsers, addUser }; 