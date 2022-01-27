<template>
  <q-bar class="navigation">
    <div class="q-pa-md">
      <span class="text-h5 kream-logo"><b>Silkk™</b></span>
    </div>
    <div class="q-pa-md">
      <q-btn-dropdown no-caps class="dropdown-btn" unelevated size="md" label="Recent" @click="onMainClick">
        <q-item clickable v-close-popup @click="onItemClick" class="project-info no-shadow">
          <q-avatar square>
            <img src="https://ih1.redbubble.net/image.2463901569.5288/st,small,507x507-pad,600x600,f8f8f8.jpg"
              class="project-icon">
          </q-avatar>
          <q-item-section>
            <q-item-label>Damn fine project</q-item-label>
          </q-item-section>
        </q-item>
      </q-btn-dropdown>
    </div>
    <div class="q-pa-md">
      <q-btn-dropdown no-caps class="dropdown-btn" unelevated size="md" label="Favourite" @click="onMainClick">
        <q-item clickable v-close-popup @click="onItemClick" class="project-info">
          <q-avatar square>
            <img src="https://ih1.redbubble.net/image.2463901569.5288/st,small,507x507-pad,600x600,f8f8f8.jpg"
              class="project-icon">
          </q-avatar>
          <q-item-section>
            <q-item-label>Damn fine project</q-item-label>
          </q-item-section>
        </q-item>
      </q-btn-dropdown>
    </div>
    <div class="q-pa-md">
      <q-btn class="outline-btn" outline label="Create" no-caps size="md" unelevated />
    </div>
    <q-space />
    <q-avatar size="36px">
      <img src="https://ih1.redbubble.net/image.2463901569.5288/st,small,507x507-pad,600x600,f8f8f8.jpg">
    </q-avatar>
    <div class="q-pa-md">
      <q-btn-dropdown unelevated no-caps size="md" class="dropdown-btn" label="My Profile">
        <div class="row no-wrap q-pa-md">
          <div class="column">
            <div class="text-h6 q-mb-md">Settings</div>
            <q-toggle v-model="darkMode" label="Dark Mode" color="black" />
            <q-toggle v-model="bluetooth" label="No Adverts" color="black" />
          </div>

          <q-separator vertical inset class="q-mx-lg" />

          <div class="column ">
            <q-avatar size="72px">
              <img src="https://ih1.redbubble.net/image.2463901569.5288/st,small,507x507-pad,600x600,f8f8f8.jpg">
            </q-avatar>

            <div class="text-subtitle1 q-mt-md q-mb-xs">Matej Radosa</div>

            <q-btn class="outline-btn" label="Logout" unelevated outline size="sm" v-close-popup />
          </div>
        </div>
      </q-btn-dropdown>
    </div>
  </q-bar>
</template>

<script lang="ts">
  import { ref } from 'vue'

  export default {
    setup() {
      return {
        onMainClick() {
          // console.log('Clicked on main button')
        },

        onItemClick() {
          // console.log('Clicked on an Item')
        },

        darkMode: ref(false),
        bluetooth: ref(false)
      };
    },
    name: 'Navigation',
  };
</script>

<style lang="scss"></style>