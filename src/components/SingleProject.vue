<template>
  <div class="projects">
    <div class="text-h3 project-single-title">
      {{ Project.title }}
    </div>

    <div class="text-h5 project-subtitle">
      Deadline: <span> {{ Project.deadline }} by {{ Author.data.name }} </span>
      <br />
      Description: <span> {{ Project.description }}</span>
    </div>

    <q-btn
      label="Create new list"
      class="add-btn"
      flat
      @click="prompt = true"
    />
    <q-dialog v-model="prompt">
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="list-title">title</div>
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
          <q-btn
            flat
            label="Cancel"
            class="prompt-btn"
            color="red"
            v-close-popup
          />
          <q-btn
            flat
            label="Create"
            class="prompt-btn"
            color="black"
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-btn
      label="Create new note"
      class="add-btn"
      flat
      @click="prompt = true"
    />
    <q-dialog v-model="prompt">
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="list-title">title</div>
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
          <q-btn
            flat
            label="Cancel"
            class="prompt-btn"
            color="red"
            v-close-popup
          />
          <q-btn
            flat
            label="Create"
            class="prompt-btn"
            color="black"
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>

  <!-- ////////////// TO-DO /////////////////// -->
  <q-list class="todo-list">
    <div class="text-h5 todo-title">Todo List</div>
    <q-item v-ripple v-for="item in Todos" :key="item" class="todo-item">
      <q-item-section avatar>
        <q-checkbox v-model="item.status" color="black"></q-checkbox>
      </q-item-section>
      <q-item-section>
        <q-item-label class="todo-task">{{ item.taskTitle }}</q-item-label>
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script lang="ts">
import project_crud from 'src/modules/project_crud';
import todo_crud from 'src/modules/todo_crud';
import { ref, reactive } from 'vue';

export default {
  setup() {
    const todoCrud = todo_crud;
    const { Todos, getTodos } = todoCrud();
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
      projID,
    } = projectCrud();

    void getSingle();
    void getAuthor();
    void getTodos();

    const state = reactive({
      projectTitle,
    });

    return {
      getTodos,
      Todos,
      todoCrud,
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
