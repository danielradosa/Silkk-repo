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
      @submit.prevent="createProject"
      class="q-gutter-md create-form"
      autocorrect="on"
      autocapitalize="off"
      spellcheck="true"
    >
      <q-input
        filled
        color="black"
        type="text"
        v-model="projectTitle"
        label="Project Title *"
        lazy-rules
        :rules="[ val => val.length >= 3 || 'Please use minimum 3 characters']"
        class="input"
      />
      <q-input
        filled
        color="black"
        v-model="projectDescription"
        autogrow
        lazy-rules
        :rules="[ val => val.length >= 10 || 'Please use minimum 10 characters']"
        label="Project Description"
        class="input"
      />
      <q-input
        filled
        color="black"
        v-model="projectDate"
        label="Project Deadline *"
        mask="date"
        fill-mask=""
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
              <q-date v-model="projectDate" class="date-info" color="grey">
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
          onclick="history.back()"
          class="dropdown-btn back-btn"
          unelevated
        />
        <q-btn
          label="Create"
          type="submit"
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

export default {
  setup() {
    const projectCrud = project_crud
    const { createProject, user, projectTitle, projectDescription, projectDate } = projectCrud();

    return {
      user,
      projectTitle,
      projectDescription,
      projectDate,
      createProject
    };
  },
  name: 'createNewProject',
};
</script>
