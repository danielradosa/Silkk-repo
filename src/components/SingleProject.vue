<template>
  <div class="projects">
    <div class="text-h3 project-single-title">
      {{ Project.title }}
      <q-icon class="edit" name="edit" size=".5em" right></q-icon>
    </div>
    <div class="desc-contain"></div>
    <div class="text-h5 project-subtitle">
      Deadline: <span> {{ time }} by {{ Project.author }} </span> <br />
      Description: <span> {{ Project.description }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { reactive, toRefs } from 'vue';
import moment from 'moment';
//import axios from 'axios'
export default {
  setup() {
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

    const url =
      'https://sill-api-app.herokuapp.com/api/project/622b1a17a900330b46af2203';

    async function getProject() {
      try {
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
          },
        })

        if (!response.ok) {
          throw new Error(`Error! status: ${response.status}`);
        }

        const result = (await response.json()) as GetProjectResponse;
        console.log(JSON.stringify(result, null, 4));
        // @ts-expect-error: Unreachable code error
        state.Project = result
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
