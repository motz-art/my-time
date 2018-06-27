/* eslint-env browser */
import storage from '../storage';

const taskInput = document.getElementById('Task-Name');
taskInput.addEventListener('keypress', taskNameKeyPress);

var list = document.querySelector('.List');
document.getElementById('Task-Add').addEventListener('click', add);

var tasks = [];

function taskNameKeyPress(e) {
  var code = e.code.toLowerCase();
  if (code === 'enter' || code === 'return') {
    add();
  }
}

function add() {
  if (taskInput.value) {
    addTask(taskInput.value, 30000 * 60);
  } else {
    addTask('New task', 30000 * 60);
  }
  taskInput.value = '';
  taskInput.focus();
}

function addTask(name, duration) {
  const task = {
    name,
    duration
  };
  storage.saveTask(task);
  createTaskElement(task);
}

function formatTime(ms) {
  const minus = ms < 0;
  if (minus) {
    ms = -ms;
  }
  var h = Math.floor(ms / 3600000) | 0;
  ms -= (h * 3600000) | 0;
  var m = Math.floor(ms / 60000) | 0;
  ms -= (m * 60000) | 0;
  var s = Math.floor(ms / 1000) | 0;
  if (h > 0) {
    return `${minus ? '-' : ''}${h.toString(10).padStart(2, '0')}:${m
      .toString(10)
      .padStart(2, '0')}:${s.toString(10).padStart(2, '0')}`;
  }
  return `${minus ? '-' : ''}${m.toString(10).padStart(2, '0')}:${s
    .toString(10)
    .padStart(2, '0')}`;
}

function updateTime(task, taskElement) {
  var time = new Date().getTime();
  var remain = task.remainTime - time + task.startTime;
  taskElement.querySelector('.Task-time').innerHTML = formatTime(remain);
}

var currentRunningTask = null;
var currentTaskElement = null;
var interval = null;
function stopTask() {
  if (currentRunningTask) {
    var time = new Date().getTime();
    currentRunningTask.remainTime -= time - currentRunningTask.startTime;
    currentRunningTask.startTime = undefined;
    storage.saveTask(currentRunningTask);
    clearInterval(interval);
    interval = null;
    currentTaskElement.querySelector('.Task-Start').innerHTML = 'Start';
    currentRunningTask = null;
  }
}

function startTask(task, taskElement) {
  stopTask();
  var time = new Date().getTime();
  if (typeof task.remainTime !== 'number') {
    task.remainTime = task.duration;
  }
  if (!task.startTime) {
    task.startTime = time;
  }
  taskElement.querySelector('.Task-Start').innerHTML = 'Stop';
  storage.saveTask(task);
  currentRunningTask = task;
  currentTaskElement = taskElement;
  interval = setInterval(() => updateTime(task, taskElement), 1000);
}

function createTaskElement(task) {
  var taskElement = document.createElement('div');
  taskElement.classList.add('Task-Item');
  taskElement.innerHTML = `<div class="Task-Name">${
    task.name
  }</div><div class="Task-time">${formatTime(
    task.remainTime || task.duration
  )}</div><button class="Task-Start">Start</button><button class="Task-Delete">Delete</button>`;
  if (task.startTime) {
    startTask(task, taskElement);
  }
  taskElement.querySelector('.Task-Delete').addEventListener('click', () => {
    storage.removeTask(task);
    if (task === currentRunningTask) {
      stopTask();
    }
    list.removeChild(taskElement);
  });
  list.appendChild(taskElement);
  taskElement.querySelector('.Task-Start').addEventListener('click', () => {
    if (currentRunningTask === task) {
      stopTask();
    } else {
      startTask(task, taskElement);
    }
  });
}

function load() {
  tasks = storage.loadTasks();
  tasks.forEach(createTaskElement);
}

function init() {
  load();
}

init();
