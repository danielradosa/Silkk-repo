<template>
  <q-bar class="navigation">
    <div class="q-pa-md">
      <span class="text-h5 kream-logo"><b>Silkk™</b></span>
    </div>
    <div class="q-pa-md">
      <q-btn-dropdown
        no-caps
        class="dropdown-btn dropdown-mobile"
        unelevated
        size="md"
        label="Recent"
        @click="faveProjects"
      >
        <q-item
          clickable
          v-close-popup
          @click="normProjects"
          class="project-info no-shadow"
        >
          <q-avatar square>
            <img
              src="https://ih1.redbubble.net/image.2463901569.5288/st,small,507x507-pad,600x600,f8f8f8.jpg"
              class="project-icon"
            />
          </q-avatar>
          <q-item-section>
            <q-item-label>Damn fine project</q-item-label>
          </q-item-section>
        </q-item>
      </q-btn-dropdown>
    </div>
    <div class="q-pa-md">
      <q-btn-dropdown
        no-caps
        class="dropdown-btn dropdown-mobile"
        unelevated
        size="md"
        label="Favourite"
      >
        <q-item clickable v-close-popup class="project-info">
          <q-avatar square>
            <img
              src="https://ih1.redbubble.net/image.2463901569.5288/st,small,507x507-pad,600x600,f8f8f8.jpg"
              class="project-icon"
            />
          </q-avatar>
          <q-item-section>
            <q-item-label>Damn fine project</q-item-label>
          </q-item-section>
        </q-item>
      </q-btn-dropdown>
    </div>
    <div class="q-pa-md">
      <router-link to="/project/create-new">
        <q-btn
          class="outline-btn outline-mobile"
          outline
          label="Create"
          no-caps
          size="md"
          unelevated
        />
      </router-link>
    </div>
    <q-space />
    <q-avatar size="36px">
      <img
        src="https://ih1.redbubble.net/image.2463901569.5288/st,small,507x507-pad,600x600,f8f8f8.jpg"
      />
    </q-avatar>
    <div class="q-pa-md">
      <q-btn-dropdown
        unelevated
        no-caps
        size="md"
        class="dropdown-btn profile-mobile"
        label="My Profile"
      >
        <div class="row no-wrap q-pa-md">
          <div class="column">
            <q-avatar size="72px">
              <img
                src="https://ih1.redbubble.net/image.2463901569.5288/st,small,507x507-pad,600x600,f8f8f8.jpg"
              />
            </q-avatar>

            <div class="text-subtitle1 q-mt-md q-mb-xs text-black">
              {{ user }}
            </div>

            <q-btn
              class="outline-btn"
              label="Logout"
              type="submit"
              @click="logoutUser"
              unelevated
              outline
              size="sm"
              v-close-popup
            />
          </div>
        </div>
      </q-btn-dropdown>
    </div>
  </q-bar>
</template>

<script lang="ts">
//import axios from 'axios';
import { useQuasar } from 'quasar';
import Cookies from 'js-cookie';
export default {
  setup() {
    const $q = useQuasar();
    let user = Cookies.get('userEmail')

    return {
      user,

      faveProjects() {
        //
      },

      normProjects() {
        //
      },

      logoutUser() {
        if (user) {
          $q.loading.show();
          setTimeout(() => (window.location.href = '#/login'), 2000);
          setTimeout(() => $q.loading.hide(), 3000);
          setTimeout(
            () =>
              $q.notify({
                type: 'positive',
                message: 'You have been logged out',
              }),
            4000
          );
        }
      },
    };
  },
  name: 'Navigation',
};
</script>
