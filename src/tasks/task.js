import formatTime from './format-time.js';

let runningTask = null;

function updateTime(task) {
  const remain = getRemainTime(task);
  task.remainingTimeFormatted = formatTime(remain);
}

function getRemainTime(task) {
  if (!task.startTime) {
    return task.remainTime;
  }
  const time = new Date().getTime();
  const remain = task.remainTime - time + task.startTime;
  return remain;
}

function getData({ id, title, duration, startTime, remainingTime }) {
  return { id, title, duration, startTime, remainingTime };
}

function changed(task, changeType, params) {
  if (typeof task.onchange === 'function') {
    task.onchange({
      changeType,
      task,
      params
    });
  }
}

function createTask({ id, title, duration, startTime, remainingTime }, onchange) {
  if (remainingTime === undefined) {
    remainingTime = duration;
  }
  const remainingTimeFormatted = formatTime(remainingTime);
  const isRunning = Boolean(startTime);
  const task = {
    id,
    isRunning,
    title,
    duration,
    startTime,
    remainingTime,
    remainingTimeFormatted,
    onchange
  };

  task.stop = function() {
    clearInterval(task.interval);
    task.remainingTime = getRemainTime(task);
    task.isRunning = false;
    task.interval = undefined;
    task.startTime = undefined;
    updateTime(task);
    changed(task, 'stop', {});
  };

  task.start = function() {
    if (runningTask) {
      runningTask.stop();
    }
    task.isRunning = true;
    runningTask = task;
    var time = new Date().getTime();
    if (typeof task.remainTime !== 'number') {
      task.remainTime = task.duration;
    }
    if (!task.startTime) {
      task.startTime = time;
    }
    task.interval = setInterval(() => updateTime(task), 1000);
    changed(task, 'start', { startTime: time });
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
