//create users list
const userList = [];

//add to users
exports.addUser = (username, password) => {
    const newUser = {username, password};
    userList.push(newUser);
  };