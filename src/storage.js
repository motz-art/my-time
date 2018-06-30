/* eslint-env browser */
let currentTask = Promise.resolve();

function loadTasks() {
  if (!localStorage.tasks) {
    return [];
  }
  const tasks = JSON.parse(localStorage.tasks);
  return Promise.resolve(tasks);
}

async function removeTask(task) {
  let tasks = await loadTasks();
  tasks = tasks.filter(x => x.id !== task.id);
  localStorage.tasks = JSON.stringify(tasks);
}

async function saveTask(task) {
  if (!task) {
    return;
  }
  let tasks = await loadTasks();
  task.id = task.id || new Date().getTime();
  let taskIndex = tasks.findIndex(x => x.id === task.id);
  if (taskIndex >= 0) {
    tasks[taskIndex] = task;
  } else {
    tasks.push(task);
  }
  localStorage.tasks = JSON.stringify(tasks);
}

async function exportData() {
  return {
    tasks: await loadTasks()
  };
}

function wrapInTransaction(fn) {
  return async function() {
    currentTask = currentTask.then(() => fn.apply(this, arguments));
  };
}

export default {
  saveTask: wrapInTransaction(saveTask),
  removeTask: wrapInTransaction(removeTask),
  loadTasks,
  exportData
};
