<template>
  <div class="q-pa-md projects">
    <div class="text-h3 project-title">Create a New Project</div>
    <div class="text-h5 project-subtitle">Fill out form below: <span class="text-red">*</span> All fields are required.</div>
  </div>
  <div class="q-pa-md">
    <q-form class="create-form">
      <q-btn label="Submit" type="submit" color="primary"/>
      <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
    </q-form>
  </div>
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
