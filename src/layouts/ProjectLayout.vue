<template>
  <Navigation />
  <projectComp />
</template>

<script lang="ts">
import Navigation from '../components/Navigation.vue';
import projectComp from '../components/MyProjects.vue';

export default {
  components: { Navigation, projectComp },
  name: 'Projects',
};
</script>

<style lang="scss">
    @import "../styles/styles.scss";
</style>