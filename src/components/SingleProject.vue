<template>
  <div class="projects">
    <div class="text-h3 project-single-title">
      {{ Project.title }}
      <q-popup-edit v-model="Project.title" auto-save v-slot="scope">
        <q-input
          v-model="scope.value"
          autofocus
          counter
          @keyup.enter="scope.set"
        />
      </q-popup-edit>
      <q-icon class="edit" name="edit" size=".5em" right></q-icon>
       <q-icon class="save" name="save" size=".5em" right @click="updateProjectTitle(Project._id, projectTitle = Project.title)"></q-icon>
    </div>
    <div class="text-h5 project-subtitle">
      Deadline: <span> {{ Project.deadline }} by {{ Author.data.name }} </span>
      <br />
      Description: <span> {{ Project.description }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import project_crud from 'src/modules/project_crud';

export default {
  setup() {
    const projectCrud = project_crud;
    const {
      Author,
      Project,
      projectTitle,
      urlSingle,
      user,
      token,
      getSingle,
      getAuthor,
      updateProjectTitle,
    } = projectCrud();

    void getSingle();
    void getAuthor();

    return {
      updateProjectTitle,
      getAuthor,
      Author,
      projectCrud,
      projectTitle,
      getSingle,
      urlSingle,
      user,
      token,
      Project,
    };
  },

  name: 'singleProject',
};
</script>
