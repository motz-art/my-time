import Vue from 'vue';
import template from './group-selector.html';

const groups = [
  { color: '#88f', name: 'Work' },
  { color: '#f66', name: 'Unplanned' },
  { color: '#ee8', name: 'Organization' },
  { color: '#fa0', name: 'Other' }
];

Vue.component('group-selector', {
  template,
  props: ['group'],
  data: function() {
    return {
      groups,
      isOpen: false
    };
  },
  created: function() {
    if (!this.group) {
      this.group = groups[0];
    }
  },
  watch: {
    group: function(val) {
      if (!this.group) {
        this.group = groups[0];
      }
    }
  },
  methods: {
    click: function() {
      this.isOpen = !this.isOpen;
    },
    groupClick: function(group) {
      this.group = group;
      this.isOpen = false;
      this.$emit('group', group);
    }
  }
});
