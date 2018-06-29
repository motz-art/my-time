/* eslint-env browser */
import Vue from 'vue';
import parseTaskInput from './parse-task-input';
import task from './task.js';
import template from './tasks.html';
import storage from '../storage.js';

const notificationPeriod = 300000;
const notificationPeriodDelta = 499;

function calculateNextNotificationTime(remainingTime) {
  var steps = Math.floor((remainingTime - notificationPeriodDelta) / notificationPeriod);
  if (steps === 0) {
    steps--;
  }
  let nextTime = steps * notificationPeriod;
  nextTime += notificationPeriodDelta;
  return nextTime;
}

Vue.component('tasks', {
  template,
  data: () => ({
    tasks: [],
    taskName: '',
    lastNotificationTask: 0,
    nextNotificationTime: null
  }),
  created: async function () {
    const tasksData = await storage.loadTasks();
    this.tasks = tasksData.map(data => this.createTask(data));
    if (Notification.permission !== 'denied') {
      Notification.requestPermission(function (permission) {
        if (permission === 'granted') {
          console.log('cool!');
        }
      });
    }
  },
  methods: {
    createTask: function (taskData) {
      const taskModel = task.createTask(taskData);
      taskModel.addEventListener('start', e => this.saveTask(e));
      taskModel.addEventListener('start', e => this.setupNotifications(e));
      taskModel.addEventListener('stop', e => this.saveTask(e));
      taskModel.addEventListener('tic', e => this.notify(e));
      if (taskModel.startTime) {
        this.setupNotifications({ task: taskModel });
      }
      return taskModel;
    },
    setupNotifications: function ({ task }) {
      var remainingTime = task.getRemainingTime();
      this.nextNotificationTime = calculateNextNotificationTime(remainingTime);
    },
    notify: function ({ task, remainingTime }) {
      if (remainingTime <= 0 && this.lastNotificationTask != task.id) {
        this.lastNotificationTask = task.id;
        if (Notification.permission === 'granted') {
          const n = new Notification('Time is over!', {
            tag: task.id,
            body: `${task.title}' ${task.remainingTimeFormatted}`
          });
        }
      } else if (remainingTime < this.nextNotificationTime) {
        this.nextNotificationTime = calculateNextNotificationTime(remainingTime);
        if (Notification.permission === 'granted') {
          const n = new Notification(`${task.remainingTimeFormatted} left.`, {
            tag: task.id,
            body: `${task.title}' ${task.remainingTimeFormatted}`
          });
        }
      }
    },
    saveTask: function({ task }) {
      const data = task.getData();
      storage.saveTask(data).then(() => {
        task.id = data.id;
      });
    },
    remove: async function(task) {
      const taskIndex = this.tasks.findIndex(x => x === task);
      if (taskIndex >= 0) {
        this.tasks.splice(taskIndex, 1);
      } else {
        console.error('task not found :(.');
      }
      if (task.startTime) {
        task.stop();
      }
      await storage.removeTask(task.getData());
    },
    addTask: async function () {
      const info = parseTaskInput(this.taskName);
      const taskVm = this.createTask(info);
      this.tasks.push(taskVm);
      this.taskName = '';
      this.$refs.taskName.focus();
      await this.saveTask({ task: taskVm });
    }
  }
});
