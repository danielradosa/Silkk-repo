<template>
  <Navigation />
  <singleProject />
</template>

<script lang="ts">
import Navigation from '../components/Navigation.vue';
import singleProject from '../components/SingleProject.vue';

export default {
  components: { Navigation, singleProject },
  name: 'Single Project',
};
</script>

<style lang="scss">
    @import "../styles/styles.scss";
</style>
