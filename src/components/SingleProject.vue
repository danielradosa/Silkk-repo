<template>
  <div class="projects">
    <div class="text-h3 project-single-title">{{ projectId }} <q-icon name="edit" size=".5em" right></q-icon></div> 
    <div class="text-h5 project-subtitle">
      Created: <span> {{}} - {{}}</span>
    </div>
    <div> {{ description }} </div>
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

<<<<<<< Updated upstream
        }).then((res) => {
          console.log(res)
        });
        console.log(receive)
      },
   };
=======
    return {
      projectId,
      state,
      makeGetRequest
    };
>>>>>>> Stashed changes
  },
  name: 'singleProject',
};
</script>
