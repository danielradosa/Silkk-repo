<template>
  <q-bar class="navigation" v-if="user">
    <div class="q-pa-md">
      <span  class="text-h5 kream-logo"><q-btn to="../projects" unelevated style="none" size="1em">Silkk™</q-btn></span>      
    </div>
    <div class="q-pa-md">
      <router-link to="/project/create-new">
        <q-btn
          class="outline-btn outline-mobile"
          outline
          label="Create New"
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
              @click="logOut"
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

  <q-bar class="navigation" v-else>
    <div class="q-pa-md">
      <span class="kream-logo"><b>Silkk™</b> | project management tool</span>
    </div>
    <q-space />
    <div class="q-pa-md">
      <q-btn
        class="outline-btn"
        to="/login"
        outline
        label="Login"
        no-caps
        size="md"
        unelevated
      />
    </div>
  </q-bar>
  
</template>

<script lang="ts">
import user_crud from 'src/modules/user_crud';

export default {
  setup() {
    const userCrud = user_crud
    const { logOut, user } = userCrud()

    return {
      logOut,
      user,

      faveProjects() {
        //
      },

      normProjects() {
        //
      },

      
    };
  },
  name: 'Navigation',
};
</script>
