<template>
  <div class="projects">
    <div class="text-h3 project-single-title">
      {{ }} Project Title 
      <q-icon class="edit" name="edit" size=".5em" right></q-icon>
    </div>
    <div class="desc-contain"></div>
    <div class="text-h5 project-subtitle">
      Created: <span> {{}} 12.03.2022 - {{  }} Some Name</span>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  setup() {
    type Project = {
      title: string;
      author: string;
      description: string;
    };

    type GetProjectResponse = {
      data: Project[];
    };

    async function getProject() {
      try {
        const response = await fetch(
          'https://sill-api-app.herokuapp.com/api/project/622b1a17a900330b46af2203',
          {
            method: 'GET',
            headers: {
              Accept: 'application/json',
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Error! status: ${response.status}`);
        }
        const result = (await response.json()) as GetProjectResponse;
        console.log(JSON.stringify(result, null, 4));
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
    };
  },

  name: 'singleProject',
};
</script>
