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
      Deadline: <span> {{ Project.deadline }} by {{ Author.name }} </span> <br />
      Description: <span> {{ Project.description }}</span>
    </div>
  </div>


<!-- ////////////// TO-DO /////////////////// -->
<div class="row todo-row">
  <div style="max-width: 400px">
    <q-toolbar-title class="text-center">Test</q-toolbar-title>
    <div>
    <q-scroll-area style="height: 600px;">
      <div v-for="n in 7" :key="n" class="q-py-xs">
     <q-item tag="label" style="max-width: 400px" >
     <q-separator />
           
        <q-item-section class="text-left">
          <q-item-label class="text-bold" >Notifications</q-item-label> <br>
          <q-item-label caption>
            Notify me about updates to apps or games that I downloaded
          </q-item-label>
        </q-item-section>
           <q-item-section side middle>
          <q-checkbox v-model="check1" />
          <q-icon class="delete" name="delete" color="grey" />
        </q-item-section>

      </q-item>
  
      </div>

    </q-scroll-area>
          <q-toolbar  v-ripple>
   <q-item-section side middle>
   <q-icon class="add" name="add" color="grey" />
   </q-item-section>
   </q-toolbar>
    </div>
  
  </div>
  <div>First column</div>
  <div>First column</div>
</div>
</template>

<script lang="ts">
import project_crud from 'src/modules/project_crud'

export default {
  setup() {
    const projectCrud = project_crud
    const { Author, Project, projectTitle, urlSingle, user, token, getSingle, getAuthor } = projectCrud();

    void getSingle();
    void getAuthor();

    return {
      getAuthor,
      Author,
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
