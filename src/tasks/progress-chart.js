import Vue from 'vue';
import template from './progress-chart.html';

Vue.component('progress-chart', {
  template,
  props: ['tasks'],
  data: function() {
    return {};
  },
  mounted: function() {
    this.draw();
  },
  computed: {
    timeData: function() {
      return this.getTimeData();
    }
  },
  watch: {
    timeData: function() {
      this.draw();
    }
  },
  methods: {
    getTimeData: function() {
      const timeData = {};
      if (Array.isArray(this.tasks)) {
        this.tasks.forEach(task => {
          const group = task.group || { name: '--', color: '#888' };
          const data = timeData[group.name] || {
            name: group.name,
            color: group.color,
            time: 0
          };
          data.time += task.duration;
          timeData[group.name] = data;
        });
      }
      return Object.values(timeData);
    },
    draw: function() {
      const canvas = this.$refs.canvas;
      if (!canvas) {
        console.error('Canvas is not found!');
        return;
      }
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const timeData = this.getTimeData();
      const total = Math.max(10, timeData.reduce((acc, item) => acc + item.time, 0));
      console.log('draw', timeData, total);

      let pos = 0;
      for (let i = 0; i < timeData.length; i++) {
        const data = timeData[i];
        ctx.fillStyle = data.color;
        const len = (data.time / total) * canvas.width;
        ctx.fillRect(pos, 5, pos + len, 15);
        pos += len;
      }
    }
  }
});
