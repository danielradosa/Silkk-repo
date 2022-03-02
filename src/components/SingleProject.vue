<template>
  <div class="projects">
    <div class="text-h3 project-title">{{ name }}</div>
    <div class="text-h5 project-subtitle">
      Created: {{ date }}
    </div>
  </div>
</template>

<script lang="ts">
//import { ref } from 'vue'
import { useRoute } from 'vue-router';
export default {
  setup() {
    const route = useRoute();
    const id = route.params.id;
    const name = route.params.name;
    const date = route.params.created;

    return {
      id, name, date
    }
  },
  name: 'singleProject',
};
</script>
