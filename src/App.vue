/* eslint-disable @typescript-eslint/no-unsafe-assignment */
<template>
  <div class="main">
    <router-view />
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'App',
  setup() {
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

    if (prefersDarkScheme.matches) {
      document.body.classList.add('body--dark');
    } else {
      document.body.classList.remove('body--dark');
    }
  }
})
</script>

<style lang="scss">

</style>