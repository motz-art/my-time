/* eslint-env browser */
import timeIco from './time-ico.js';

const notificationPeriod = 300000;
const notificationPeriodDelta = 499;
let lastNotificationTask = 0;
let nextNotificationTime = null;

function calculateNextNotificationTime(remainingTime) {
  var steps = Math.floor((remainingTime - notificationPeriodDelta) / notificationPeriod);
  if (steps === 0) {
    steps--;
  }
  let nextTime = steps * notificationPeriod;
  nextTime += notificationPeriodDelta;
  return nextTime;
}

function setupNotifications(task) {
  var remainingTime = task.getRemainingTime();
  nextNotificationTime = calculateNextNotificationTime(remainingTime);
}

function showNotification(title, body, task) {
  if (Notification.permission === 'granted') {
    // eslint-disable-next-line no-unused-vars
    const n = new Notification(title, {
      tag: task.id,
      body: body,
      icon: timeIco({
        remainingTime: task.getRemainingTime(),
        totalTime: task.duration,
        remainingTimeFormatted: task.getRemainingTimeFormatted(true)
      })
    });
  }
}

function notify(task, remainingTime) {
  if (remainingTime <= 0 && lastNotificationTask !== task.id) {
    lastNotificationTask = task.id;
    showNotification('Time is over!', task.title, task);
  } else if (remainingTime < nextNotificationTime) {
    nextNotificationTime = calculateNextNotificationTime(remainingTime);
    showNotification(
      task.title,
      remainingTime > 0
        ? `${task.remainingTimeFormatted} left.`
        : `Task is ${task.remainingTimeFormatted} overdue.`,
      task
    );
  }
}

export default { notify, setupNotifications };
