<template>
  <div class="projects">
    <div class="text-h3 project-title">{{ name }}</div>
    <div class="text-h5 project-subtitle">
      Created: <span> {{ date }}</span>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  setup() {
    return {
     name: 'Awesome Project',
     date: '25th of May 2022'
    };
  },
  name: 'singleProject',
};
</script>
