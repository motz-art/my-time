import formatTime from './format-time.js';

let runningTask = null;

function updateTime(task) {
  const remain = getRemainingTime(task);
  task.spentTime = task.duration - remain;
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

function getData({ id, title, duration, startTime, remainingTime, isComplete, group }) {
  return {
    id,
    title,
    duration,
    startTime,
    remainingTime,
    isComplete,
    group: { name: group.name, color: group.color }
  };
}

function createTask({
  id,
  title,
  duration,
  startTime,
  remainingTime,
  isComplete,
  group
}) {
  isComplete = isComplete || false;
  if (remainingTime === undefined) {
    remainingTime = duration;
  }
  const remainingTimeFormatted = formatTime(remainingTime);
  const isRunning = Boolean(startTime);
  const eventListeners = {
    start: [],
    stop: [],
    tic: [],
    complete: [],
    incomplete: [],
    change: [],
    updateGroup: []
  };
  const spentTime = duration - remainingTime;
  const task = {
    id,
    isRunning,
    title,
    isComplete,
    duration,
    spentTime,
    startTime,
    remainingTime,
    remainingTimeFormatted,
    group
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

  task.complete = function() {
    if (task.isRunning) {
      task.stop();
    }
    task.isComplete = true;
    task.raiseEvent('complete', {});
  };

  task.incomplete = function() {
    task.isComplete = false;
    task.raiseEvent('incomplete', {});
  };

  task.stop = function() {
    if (task.interval) {
      clearInterval(task.interval);
    }
    task.remainingTime = getRemainingTime(task);
    task.isRunning = false;
    task.interval = undefined;
    task.startTime = undefined;
    updateTime(task);
    task.raiseEvent('stop', {});
  };

  task.getRemainingTimeFormatted = function(short) {
    return formatTime(task.getRemainingTime(), short);
  };

  task.start = function() {
    if (task.isComplete) {
      throw new Error(`Can't start complete task.`);
    }
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
    if (task.interval) {
      clearInterval(task.interval);
    }
    task.interval = setInterval(() => updateTime(task), 1000);
    task.raiseEvent('start', { startTime: time });
  };

  task.getData = function() {
    return getData(task);
  };

  task.updateGroup = function(a, b, c) {
    task.group = { name: a.name, color: a.color };
    console.log(task.group);
    task.raiseEvent('updateGroup', task.group);
  };

  if (task.startTime) {
    task.start();
    updateTime(task);
  }

  return task;
}

export default { createTask };
