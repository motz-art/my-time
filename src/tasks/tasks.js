/* eslint-env browser */
import Vue from 'vue';
import parseTaskInput from './parse-task-input';
import task from './task.js';
import template from './tasks.html';
import storage from '../storage.js';
import download from '../download.js';
import notification from './notification.js';

Vue.component('tasks', {
  template,
  data: () => ({
    tasks: [],
    taskName: ''
  }),
  created: async function() {
    const tasksData = await storage.loadTasks();
    this.tasks = tasksData.map(data => this.createTask(data));
    if (Notification.permission !== 'denied') {
      Notification.requestPermission(function() {});
    }
  },
  methods: {
    createTask: function(taskData) {
      const taskModel = task.createTask(taskData);
      taskModel.addEventListener('start', e => this.saveTask(e));
      taskModel.addEventListener('start', e => notification.setupNotifications(e.task));
      taskModel.addEventListener('stop', e => this.saveTask(e));
      taskModel.addEventListener('complete', e => this.saveTask(e));
      taskModel.addEventListener('incomplete', e => this.saveTask(e));
      taskModel.addEventListener('tic', e =>
        notification.notify(e.task, e.remainingTime)
      );
      if (taskModel.startTime) {
        notification.setupNotifications(taskModel);
      }
      return taskModel;
    },
    exportData: async function() {
      const data = await storage.exportData();
      download(data, 'tasks.json');
    },
    saveTask: function({ task }) {
      const data = task.getData();
      return storage.saveTask(data).then(() => {
        task.id = data.id;
      });
    },
    changeComplete: async function(task) {
      if (task.isComplete) {
        task.incomplete();
      } else {
        task.complete();
      }
    },
    remove: async function(task) {
      const taskIndex = this.tasks.findIndex(x => x === task);
      if (taskIndex >= 0) {
        this.tasks.splice(taskIndex, 1);
      } else {
        // eslint-disable-next-line no-console
        console.error('task not found :(.');
      }
      if (task.startTime) {
        task.stop();
      }
      await storage.removeTask(task.getData());
    },
    addTask: async function() {
      const info = parseTaskInput(this.taskName);
      const taskVm = this.createTask(info);
      this.tasks.push(taskVm);
      this.taskName = '';
      this.$refs.taskName.focus();
      await this.saveTask({ task: taskVm });
    }
  }
});
