<template>
  <div class="projects">
    <div class="text-h3 project-single-title">
      {{ Project.title }}
    </div>

    <div class="text-h5 project-subtitle">
      Deadline: <span class="noDeadline" :class="{ 'yesDeadline': Project.deadline <= finalDate }"> {{ Project.deadline }}</span>

      <span class="sii"> by {{ Author.data.name }} </span>
      <br />
      Description: <span class="sii"> {{ Project.description }}</span>
    </div>

    <q-btn
      label="Create new todo list"
      class="add-btn"
      flat
      @click="newList = true"
    />
    <q-dialog v-model="newList">
      <q-card style="min-width: 350px" class="note-box">
        <q-card-section>
          <div class="list-title">title</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input
            dense
            color="grey"
            counter
            maxlength="28"
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
            @click="createList()"
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
      @click="newNote = true"
    />
    <q-dialog v-model="newNote">
      <q-card style="min-width: 350px" class="note-box">
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
    <q-list
      class="todo-list"
      separator
      v-for="(list, index) in Lists"
      :key="list"
    >
      <div class="text-h5 todo-title">
        {{ list.listTitle }} &nbsp;<q-icon
          ><q-btn
            flat
            dense
            round
            color="grey"
            icon="delete"
            @click.stop="deleteList(list._id as string, index)"
          ></q-btn
        ></q-icon>
      </div>
      <q-input
        v-model="newTask"
        class="input-task"
        placeholder="Add task"
        clearable
        counter
        dense
        debounce="1000000000"
        maxlength="28"
        @keyup.enter="createTodo(list._id as string)"
      >
      </q-input>
      <template v-if="newTask" v-slot:append>
        <q-icon
          name="cancel"
          @click.stop="newTask = null"
          class="cursor-pointer"
        />
      </template>

      <q-item
        v-ripple
        v-for="item in list.todo"
        :key="item"
        :class="{ 'done bg-grey-3': item.status == true }"
        class="todo-item"
      >

        <q-item-section avatar v-if="item.status == false">
          <q-checkbox
            v-model="item.status"
            @click="completeTodo(list._id as string, item._id as string)"
          >
          </q-checkbox>
          <q-linear-progress dark query rounded color="white" class="q-mt-sm" size="xs" />
        </q-item-section>

        <q-item-section avatar v-else-if="item.status == true">
          <q-checkbox
            v-model="item.status"
            @click="uncompleteTodo(list._id as string, item._id as string)"
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
            @click.stop="deleteTodo(list._id as string, item._id as string)"
          ></q-btn>
        </q-item-section>
      </q-item>

    </q-list>

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
import note_crud from 'src/modules/note_crud';
import list_crud from 'src/modules/list_crud';
import { ref } from 'vue';

export default {
  setup() {
    const progress = ref(0);
    const listCrud = list_crud;
    const {
      createList,
      deleteList,
      listTitle,
      getLists,
      Lists,
      Todos,
      createTodo,
      newTask,
      completeTodo,
      uncompleteTodo,
      deleteTodo,
    } = listCrud();
    const noteCrud = note_crud;
    const { getNotes, Notes, createNote, deleteNote, noteTitle, noteContent } =
      noteCrud();
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

    // get current date as a string year/month/day
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();
    const checkDate = yyyy + '/' + mm + '/' + dd;
    const finalDate = checkDate.toString();

    void getSingle();
    void getAuthor();
    void getNotes();
    void getLists();
    
    return {
      today,
      dd,
      mm,
      yyyy,
      checkDate,
      finalDate,
      Todos,
      completeTodo,
      uncompleteTodo,
      createTodo,
      deleteTodo,
      newTask,
      listCrud,
      noteTitle,
      listTitle,
      noteContent,
      noteCrud,
      createNote,
      deleteNote,
      Notes,
      getNotes,
      projID,
      newNote: ref(false),
      newList: ref(false),
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
      createList,
      deleteList,
      getLists,
      Lists,
    };
  },
};
</script>
