const fs = require('fs');
const path = require('path');
const usersFile = path.join(__dirname, '../data/users.json');

function getUsers() {
  return JSON.parse(fs.readFileSync(usersFile, 'utf8'));
}

function saveUsers(users) {
  fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));
}

module.exports = { getUsers, saveUsers };