import Vue from 'vue';
import parseTaskInput from './parse-task-input';
import task from './task.js';
import template from './tasks.html';
import storage from '../storage.js';

Vue.component('tasks', {
  template,
  data: () => ({
    tasks: [],
    taskName: ''
  }),
  created: async function() {
    const tasksData = await storage.loadTasks();
    this.tasks = tasksData.map(data => task.createTask(data, this.onchange));
  },
  methods: {
    onchange: async function({ task }) {
      const data = await Promise.resolve(task.getData());
      await storage.saveTask(data);
    },
    remove: async function(task) {
      const taskIndex = this.tasks.findIndex(x => x === task);
      if (taskIndex >= 0) {
        this.tasks.splice(taskIndex, 1);
      } else {
        console.error('task not found :(.');
      }
      await storage.removeTask(task.getData());
    },
    addTask: async function() {
      const info = parseTaskInput(this.taskName);
      const taskVm = task.createTask(info, this.onchange);
      this.tasks.push(taskVm);
      this.taskName = '';
      this.$refs.taskName.focus();
      const taskData = taskVm.getData();
      await storage.saveTask(taskData);
      taskVm.id = taskData.id;

    }
  }
});
