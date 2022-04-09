<template>
  <div class="projects">
    <div class="text-h3 project-single-title">
      {{ Project.title }}
    </div>

    <div class="text-h5 project-subtitle">
      Deadline: <span> {{ Project.deadline }}</span>
      <span> by {{ Author.data.name }} </span>
      <br />
      Description: <span> {{ Project.description }}</span>
    </div>

    <q-btn
      label="Create new note"
      class="add-btn"
      flat
      @click="newNote = true"
    />
    <q-dialog v-model="newNote">
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="list-title">title</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input
            dense
            color="grey"
            counter
            maxlength="28"
            v-model="noteTitle"
            autofocus
            @keyup.enter="prompt = false"
          />
          <q-card-section>
            <div class="list-title">Note Content</div>
          </q-card-section>
          <div class="q-pa-md" style="max-width: 350px">
            <q-input v-model="noteContent" filled type="textarea" />
          </div>
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
            @click="createNote()"
            label="Create"
            class="prompt-btn"
            color="black"
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>

  <div class="stuff">
    <!-- ////////////// TO-DO /////////////////// -->
    <q-list class="todo-list" separator>
      <div class="text-h5 todo-title">Todo List</div>
      <q-input
        v-model="newTask"
        class="input-task"
        placeholder="Add task"
        dense
        counter
        maxlength="28"
        @keyup.enter="createTodo"
      >
        <template v-slot:append>
          <q-btn round dense flat icon="add" @click="createTodo" />
        </template>
      </q-input>
      <q-item
        v-ripple
        v-for="(item, index) in Todos"
        :key="item"
        :class="{ 'done bg-grey-3': item.status == true }"
        class="todo-item"
      >
        <q-item-section avatar v-if="item.status == false">
          <q-checkbox
            v-model="item.status"
            @click="completeTodo(item._id as string)"
          ></q-checkbox>
        </q-item-section>
        <q-item-section avatar v-else-if="item.status == true">
          <q-checkbox
            v-model="item.status"
            @click="uncompleteTodo(item._id as string)"
            color="black"
          ></q-checkbox>
        </q-item-section>
        <q-item-section>
          <q-item-label class="todo-task">{{ item.taskTitle }}</q-item-label>
        </q-item-section>
        <q-item-section v-if="item.status == true" side>
          <q-btn
            flat
            dense
            round
            color="grey"
            icon="delete"
            @click.stop="deleteTodo(item._id as string, index)"
          ></q-btn>
        </q-item-section>
      </q-item>
      <div class="q-pa-md">
        <q-linear-progress size="25px" :value="progress" color="accent">
          <div class="absolute-full flex flex-center">
            <q-badge
              color="white"
              text-color="accent"
              :label="progressLabel"
            />
          </div>
        </q-linear-progress>
      </div>
    </q-list>

    <!-- ////////////// NOTES /////////////////// -->
    <q-list class="q-pa-md note" v-for="(thing, index) in Notes" :key="thing">
      <div class="note-item q-pa-md">
        <div class="text-h5 note-title">
          {{ thing.noteTitle }}
          <q-btn
            flat
            dense
            round
            color="grey"
            icon="delete"
            @click.stop="deleteNote(thing._id as string, index)"
          ></q-btn>
        </div>
        <p class="note-content">
          {{ thing.content }}
        </p>
      </div>
    </q-list>
  </div>
</template>

<script lang="ts">
import project_crud from 'src/modules/project_crud';
import todo_crud from 'src/modules/todo_crud';
import note_crud from 'src/modules/note_crud';
import { ref, watch, computed } from 'vue';

export default {
  setup() {
    const progress = ref(0.3)
    const noteCrud = note_crud;
    const { getNotes, Notes, createNote, deleteNote, noteTitle, noteContent } =
      noteCrud();
    const todoCrud = todo_crud;
    const {
      allTodosURL,
      Todos,
      getTodos,
      completeTodo,
      uncompleteTodo,
      deleteTodo,
      createTodo,
      newTask,
    } = todoCrud();
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
    void getNotes();

    watch(Todos, (newTask) => {
      if (newTask.length >= 0) {
        void getTodos();
      }
    });

    watch(Notes, (newNote) => {
      if (newNote.length >= 0) {
        void getNotes();
      }
    });

    return {
      progressLabel: computed(() => (progress.value * 100).toFixed(2) + '%'),
      allTodosURL,
      noteTitle,
      noteContent,
      noteCrud,
      createNote,
      deleteNote,
      Notes,
      getNotes,
      newTask,
      createTodo,
      deleteTodo,
      uncompleteTodo,
      completeTodo,
      getTodos,
      Todos,
      todoCrud,
      projID,
      newNote: ref(false),
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
