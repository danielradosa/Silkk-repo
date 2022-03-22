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
import project_crud from 'src/modules/project_crud'

export default {
  setup() {
    const projectCrud = project_crud
    const { Project, projectTitle, urlSingle, user, token, getSingle } = projectCrud();

    void getSingle()

    return {
      projectCrud,
      projectTitle,
      getSingle,
      urlSingle,
      user,
      token,
      Project
    };
  },

  name: 'singleProject',
};
</script>
