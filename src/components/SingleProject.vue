<template>
  <div class="projects">
    <div class="text-h3 project-title">Damn good project</div>
    <div class="text-h5 project-subtitle">Created: {{allStuff}}</div>
  </div>
</template>

<script lang="ts">
  export default {
    setup() {
      let currentDate = new Date();
      let day = currentDate.getDate();
      let month = currentDate.getMonth() + 1;
      let year = currentDate.getFullYear();
      let allStuff = `${day}. ${month}. ${year}`
      return {
       allStuff
      };
    },
    name: 'singleProject',
  };
</script>
