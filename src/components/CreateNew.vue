<template>
  <div class="q-pa-md projects" v-if="!user">
    <div class="text-h3 project-create-title">
      You can not create new project, unless you
      <router-link to="/login" class="err-link">log in</router-link>.
    </div>
  </div>

  <div v-else>
    <div class="q-pa-md projects">
      <div class="text-h3 project-create-title">Create a New Project</div>
      <div class="text-h5 project-subtitle">
        Fill out form below: <br />
        <span class="text-red">*</span> All fields are required.
      </div>
    </div>

    <q-form
      class="q-gutter-md create-form"
      autocorrect="on"
      autocapitalize="off"
      spellcheck="true"
    >
      <q-input
        filled
        color="black"
        type="text"
        v-model="title"
        label="Project Title *"
        lazy-rules
        :rules="['Please type something']"
        class="input"
      />
      <q-input
        filled
        color="black"
        v-model="description"
        autogrow
        label="Project Description"
        class="input"
      />
      <q-input
        filled
        color="black"
        v-model="deadline"
        label="Project Deadline *"
        mask="date"
        :rules="['date']"
        class="input"
      >
        <template v-slot:append>
          <q-icon name="event" class="cursor-pointer">
            <q-popup-proxy
              ref="qDateProxy"
              transition-show="scale"
              transition-hide="scale"
              class="shadow-24"
            >
              <q-date v-model="deadline" class="date-info" color="grey">
                <div class="row items-center justify-end">
                  <q-btn v-close-popup label="Close" color="close-btn" flat />
                </div>
              </q-date>
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>
      <div class="buttons-in">
        <q-btn
          label="Back"
          type="submit"
          to="/projects"
          class="dropdown-btn back-btn"
          unelevated
        />
        <q-btn
          label="Create"
          type="submit"
          @click="createProject"
          class="outline-btn"
          outline
          unelevated
        />
      </div>
    </q-form>
  </div>
</template>

<script lang="ts">
import project_crud from 'src/modules/project_crud'
import { ref } from 'vue'

export default {
  setup() {
    const projectCrud = project_crud
    const { createProject, user } = projectCrud();

    return {
      user,
      title: ref(''),
      authorEmail: ref(user),
      description: ref(''),
      deadline: ref('2022/01/01'),
      createProject
    };
  },
  name: 'createNewProject',
};
</script>
