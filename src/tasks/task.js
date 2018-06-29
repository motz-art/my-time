import formatTime from './format-time.js';

let runningTask = null;

function updateTime(task) {
  const remain = getRemainingTime(task);
  task.remainingTimeFormatted = formatTime(remain);
  task.raiseEvent('tic', { remainingTime: remain });
}

function getRemainingTime(task) {
  if (!task.startTime) {
    return task.remainingTime;
  }
  const time = new Date().getTime();
  const remain = task.remainingTime - time + task.startTime;
  return remain;
}

function getData({ id, title, duration, startTime, remainingTime }) {
  return { id, title, duration, startTime, remainingTime };
}

function createTask({ id, title, duration, startTime, remainingTime }) {
  if (remainingTime === undefined) {
    remainingTime = duration;
  }
  const remainingTimeFormatted = formatTime(remainingTime);
  const isRunning = Boolean(startTime);
  const eventListeners = {
    start: [],
    stop: [],
    tic: [],
    change: []
  };

  const task = {
    id,
    isRunning,
    title,
    duration,
    startTime,
    remainingTime,
    remainingTimeFormatted,
  };

  task.addEventListener = function(eventName, handler) {
    if (!eventListeners[eventName]) {
      throw new Error(`Unknown event name ${eventName}`);
    }
    eventListeners[eventName].push(handler);
  };

  task.raiseEvent = function(eventName, eventData) {
    if (!eventListeners[eventName]) {
      throw new Error(`Unknown event name ${eventName}`);
    }
    Object.assign(eventData, { task, eventName });
    eventListeners[eventName].forEach(handler => handler(eventData));
  };

  task.getRemainingTime = function() {
    return getRemainingTime(task);
  };

  task.stop = function() {
    clearInterval(task.interval);
    task.remainingTime = getRemainingTime(task);
    task.isRunning = false;
    task.interval = undefined;
    task.startTime = undefined;
    updateTime(task);
    task.raiseEvent('stop', {});
  };

  task.start = function() {
    if (runningTask) {
      runningTask.stop();
    }
    task.isRunning = true;
    runningTask = task;
    var time = new Date().getTime();
    if (typeof task.remainingTime !== 'number') {
      task.remainingTime = task.duration;
    }
    if (!task.startTime) {
      task.startTime = time;
    }
    task.interval = setInterval(() => updateTime(task), 1000);
    task.raiseEvent('start', { startTime: time });
  };

  task.getData = function() {
    return getData(task);
  };

  if (task.startTime) {
    task.start();
    updateTime(task);
  }

  return task;
}

export default { createTask };
