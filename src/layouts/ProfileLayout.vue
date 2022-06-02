<template>
  <Navigation />
  <UserProfile />
</template>

<script lang="ts">
import Navigation from '../components/Navigation.vue';
import UserProfile from '../components/UserProfile.vue'

export default {
  components: { Navigation, UserProfile },
  name: 'User Profile',
};
</script>

<style lang="scss">
    @import "../styles/styles.scss";
</style>
