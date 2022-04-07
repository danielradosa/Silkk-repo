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
    </div>
    <div class="text-h5 project-subtitle">
      Deadline: <span> {{ Project.deadline }} by {{ Author.data.name }} </span>
      <br />
      Description: <span> {{ Project.description }}</span>
    </div>

    <q-btn label="Create new list" class="add-btn" flat @click="prompt = true" />
    <q-dialog v-model="prompt" persistent>
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="list-title">List title</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input
            dense
            color="grey"
            v-model="listTitle"
            autofocus
            @keyup.enter="prompt = false"
          />
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel"  class="prompt-btn" color="red" v-close-popup />
          <q-btn flat label="Add list" class="prompt-btn" color="black" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-btn label="Create new note" class="add-btn" flat @click="prompt = true" />
    <q-dialog v-model="prompt" persistent>
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="list-title">Note title</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input
            dense
            color="grey"
            v-model="noteTitle"
            autofocus
            @keyup.enter="prompt = false"
          />
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel"  class="prompt-btn" color="red" v-close-popup />
          <q-btn flat label="Add list" class="prompt-btn" color="black" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script lang="ts">
import project_crud from 'src/modules/project_crud';
import { ref, reactive } from 'vue';
 
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
      projID
    } = projectCrud();

    void getSingle();
    void getAuthor();

    const state = reactive({
      projectTitle,
    })
    
    void updateProjectTitle(projID, state.projectTitle);

    return {
      projID,
      state,
      prompt: ref(false),
      address: ref(''),
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
