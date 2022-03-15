<template>
  <div class="projects">
    <div class="text-h3 project-single-title">{{ projectId }}</div>
    <div class="text-h5 project-subtitle">
      Created: <span> {{ deadline }} - {{ author }}</span>
    </div>
    <div> {{ description }} </div>
  </div>
</template>

<script lang="ts">
import axios from 'axios';
import { useRoute } from 'vue-router';
export default {
  setup() {
    const route = useRoute();
    const projectId = route.params.id

    return {     
      projectId,

      async getProject() {
        const receive = await axios.get('https://sill-api-app.herokuapp.com/api/projects/622b1a17a900330b46af2203', {

        }).then((res) => {
          console.log(res)
        });
        console.log(receive)
      },
    };
  },
  name: 'singleProject',
};
</script>
