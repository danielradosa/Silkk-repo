<template>
  <Navigation />
  <CreateNew />
</template>

<script lang="ts">
import Navigation from '../components/Navigation.vue';
import CreateNew from '../components/CreateNew.vue'

export default {
  components: { Navigation, CreateNew },
  name: 'Create New Project',
};
</script>

<style lang="scss">
    @import "../styles/styles.scss";
</style>
