<template>
  <div class="projects">
    <div class="text-h3 project-single-title">{{ projectId }} <q-icon class="edit" name="edit" size=".5em" right></q-icon></div>
    <div class="desc-contain"></div> 
    <div class="text-h5 project-subtitle">
      Created: <span> {{}} - {{}}</span>
    </div>
  </div>
</template>

<script lang="ts">
import axios from 'axios';
import { reactive } from 'vue';
import { useRoute } from 'vue-router';
export default {
  setup() {
    const route = useRoute();
    const projectId = route.params.id;
    const state = reactive({
      projects: {},
    });

    async function makeGetRequest() {
      let res = await axios.get('https://sill-api-app.herokuapp.com/api/projects/622b1a17a900330b46af2203');
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      let data = res.data;
      console.log(data);
    }

    return {
      projectId,
      state,
      makeGetRequest
    };
  },
  name: 'singleProject',
};
</script>
