const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');
const usersFile = path.join(__dirname, '../data/users.json');

const getUsers = () => JSON.parse(fs.readFileSync(usersFile));
const saveUsers = data => fs.writeFileSync(usersFile, JSON.stringify(data, null, 2));

exports.getAllUsers = (req, res) => res.json(getUsers());
exports.getUserById = (req, res) => {
  const user = getUsers().find(u => u.id === req.params.id);
  if (!user) return res.status(404).json({ message: 'Usuário não encontrado' });
  res.json(user);
};
exports.createUser = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) return res.status(400).json({ message: 'Campos obrigatórios' });
  const users = getUsers();
  const hashed = await bcrypt.hash(password, 10);
  const newUser = { id: uuidv4(), name, email, password: hashed };
  users.push(newUser);
  saveUsers(users);
  res.status(201).json(newUser);
};
exports.updateUser = (req, res) => {
  const users = getUsers();
  const index = users.findIndex(u => u.id === req.params.id);
  if (index === -1) return res.status(404).json({ message: 'Usuário não encontrado' });
  users[index] = { ...users[index], ...req.body };
  saveUsers(users);
  res.json(users[index]);
};
exports.deleteUser = (req, res) => {
  let users = getUsers();
  const newUsers = users.filter(u => u.id !== req.params.id);
  saveUsers(newUsers);
  res.json({ message: 'Usuário removido com sucesso' });
};