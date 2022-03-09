<template>
  <div class="q-pa-md projects">
    <div class="text-h3 project-create-title">Create a New Project</div>
    <div class="text-h5 project-subtitle">Fill out form below: <span class="text-red">*</span> All fields are required.</div>
  </div>

    <q-form @submit="nothing"
            @reset="nothing"
            class="q-gutter-md create-form"
            autocorrect="off"
            autocapitalize="off"
            spellchech="false">
         <q-input filled color="black" type="text" v-model="projectTitle" label="Project Title *" lazy-rules :rules="['Please type something']" class="input" />
         <q-input filled color="black" v-model="projectDescription" autogrow label="Project Description" class="input" />
         <q-input filled color="black" v-model="date" label="Project Deadline *" mask="date" :rules="['date']" class="input">
          <template v-slot:append>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale" class="shadow-24">
                <q-date v-model="date" class="date-info" color="grey">
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="close-btn" flat />
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-icon>
          </template>
         </q-input>
      <div class="buttons-in">
        <q-btn label="Back" type="submit" to="/projects" class="dropdown-btn back-btn" unelevated />
        <q-btn label="Create" type="submit" to="/project" class="outline-btn" outline unelevated />
      </div>
    </q-form>

</template>
<script lang="ts">
 import { ref } from 'vue'
  export default {
    setup() {
      return {
        projectTitle: ref(''),
        projectDescription: ref(''),
        date: ref('2019/02/01')
      };
    },
    name: 'createNewProject',
  };
</script>
