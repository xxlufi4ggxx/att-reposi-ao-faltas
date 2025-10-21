const fs = require('fs');
const path = require('path');
const tasksFile = path.join(__dirname, '../data/tasks.json');

function getTasks() {
  return JSON.parse(fs.readFileSync(tasksFile, 'utf8'));
}

function saveTasks(tasks) {
  fs.writeFileSync(tasksFile, JSON.stringify(tasks, null, 2));
}

module.exports = { getTasks, saveTasks };