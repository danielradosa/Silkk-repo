<template>
  <div class="q-pa-md projects">
    <div class="text-h3 project-title">Create a New Project</div>
    <div class="text-h5 project-subtitle">Fill out form below: <span class="text-red">*</span> All fields are required.</div>
  </div>

    <q-form @submit="onSubmit" 
            @reset="onReset" 
            class="q-gutter-md create-form">
         <q-input filled color="black" v-model="projectTitle" label="Project Title *" lazy-rules :rules="['Please type something']" />
         <q-input v-model="text" filled autogrow label="Project Description"/>
         <q-input filled color="black" v-model="projectName" label="Project Name *" lazy-rules :rules="['Please type something']" />
      <div class="buttons-in">
        <q-btn label="Back" type="submit" to="/projects" class="dropdown-btn back-btn" unelevated />
        <q-btn label="Create" type="submit" to="/project" class="outline-btn" outline unelevated />
      </div>
    </q-form>

</template>
<script lang="ts">
  export default {
    setup() {
      return {
      };
    },
    name: 'createNewProject',
  };
</script>

<style lang="scss" scoped>
.create-form {
  margin-top: 2em;
    width: 450px !important;
    margin-left: 10.5%;
}
.back-btn {
    margin-right: 2em;
}
.buttons-in {
  margin-top: 4em;
}
</style>
