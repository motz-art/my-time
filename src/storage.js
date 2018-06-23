/* eslint-env browser */

function loadTasks() {
  if (!localStorage.tasks) {
    return [];
  }
  const tasks = JSON.parse(localStorage.tasks);
  return tasks;
}

function removeTask(task) {
  let tasks = loadTasks();
  tasks = tasks.filter(x => x.id !== task.id);
  localStorage.tasks = JSON.stringify(tasks);
}

function saveTask(task) {
  if (!task) {
    return;
  }
  let tasks = loadTasks();
  task.id = task.id || new Date().getTime();
  let taskIndex = tasks.findIndex(x => x.id === task.id);
  if (taskIndex >= 0) {
    tasks[taskIndex] = task;
  } else {
    tasks.push(task);
  }
  localStorage.tasks = JSON.stringify(tasks);
}

export default {
  saveTask,
  removeTask,
  loadTasks
};
