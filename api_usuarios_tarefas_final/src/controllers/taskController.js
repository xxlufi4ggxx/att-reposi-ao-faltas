const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const path = require('path');
const tasksFile = path.join(__dirname, '../data/tasks.json');
const getTasks = () => JSON.parse(fs.readFileSync(tasksFile));
const saveTasks = data => fs.writeFileSync(tasksFile, JSON.stringify(data, null, 2));

exports.getAllTasks = (req, res) => res.json(getTasks());
exports.getTaskById = (req, res) => {
  const task = getTasks().find(t => t.id === req.params.id);
  if (!task) return res.status(404).json({ message: 'Tarefa não encontrada' });
  res.json(task);
};
exports.createTask = (req, res) => {
  const { title, description, dueDate } = req.body;
  if (!title || !description || !dueDate) return res.status(400).json({ message: 'Campos obrigatórios' });
  const tasks = getTasks();
  const newTask = { id: uuidv4(), title, description, dueDate };
  tasks.push(newTask);
  saveTasks(tasks);
  res.status(201).json(newTask);
};
exports.updateTask = (req, res) => {
  const tasks = getTasks();
  const index = tasks.findIndex(t => t.id === req.params.id);
  if (index === -1) return res.status(404).json({ message: 'Tarefa não encontrada' });
  tasks[index] = { ...tasks[index], ...req.body };
  saveTasks(tasks);
  res.json(tasks[index]);
};
exports.deleteTask = (req, res) => {
  let tasks = getTasks();
  const newTasks = tasks.filter(t => t.id !== req.params.id);
  saveTasks(newTasks);
  res.json({ message: 'Tarefa removida com sucesso' });
};