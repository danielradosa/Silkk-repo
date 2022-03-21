<template>
  <div class="projects">
    <div class="text-h3 project-single-title">
      {{ Project.title }}
      <q-popup-edit
        v-model="Project.title"
        auto-save
        v-slot="scope"
        class="title-edit shadow-24"
        :cover="false"
        :offset="[-500, -20]"
      >
        <q-input
          v-model="scope.value"
          dense
          autofocus
          counter
          @keyup.enter="scope.set"
        />
      </q-popup-edit>
      <q-icon class="edit" name="edit" size=".5em" right></q-icon>
    </div>
    <div class="desc-contain"></div>
    <div class="text-h5 project-subtitle">
      Deadline: <span> {{ Project.deadline }} by {{ Project.author }} </span> <br />
      Description: <span> {{ Project.description }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { reactive, toRefs, ref } from 'vue';
import moment from 'moment';
//import axios from 'axios'

export default {
  setup() {

    const projID = ref(window.location.hash).value.slice(10) || '/'

    const state = reactive({
      Project: [],
    });

    var time = moment('2019-11-03T05:00:00.000Z').utc().format('DD.MM.YYYY');

    type Project = {
      title: string;
      author: string;
      description: string;
      deadline: Date;
    };

    type GetProjectResponse = {
      data: Project[];
    };

    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    const url = `https://sill-api-app.herokuapp.com/api/project/${projID}`;
    
    async function getProject() {
      try {
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`Error! status: ${response.status}`);
        }

        const result = (await response.json()) as GetProjectResponse;
        console.log(JSON.stringify(result, null, 4));
        // @ts-expect-error: Unreachable code error
        state.Project = result;
        return result;
      } catch (error) {
        if (error instanceof Error) {
          console.log('error message: ', error.message);
          return error.message;
        } else {
          console.log('unexpected error: ', error);
          return 'An unexpected error occurred';
        }
      }
    }

    void getProject();

    console.log();

    return {
      getProject,
      url,
      time,
      ...toRefs(state),
    };
  },

  name: 'singleProject',
};
</script>
