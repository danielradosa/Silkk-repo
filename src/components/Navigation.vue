<template>
  <q-bar class="navigation" v-if="user">
    <div class="q-pa-md">
      <span class="text-h5 kream-logo"
        ><q-btn class="isl" to="../projects" unelevated style="none" size="1em"
          >Silkk™</q-btn
        ></span
      >
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
    <q-avatar size="36px" class="avat">
      <img
        src="https://user-images.githubusercontent.com/30195/34457818-8f7d8c76-ed82-11e7-8474-3825118a776d.png"
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
        <div class="row no-wrap q-pa-md mennu">
          <div class="column">
            <q-avatar size="72px">
              <img
                src="https://user-images.githubusercontent.com/30195/34457818-8f7d8c76-ed82-11e7-8474-3825118a776d.png"
              />
            </q-avatar>

            <div class="text-subtitle2 q-mt-md q-mb-xs text-black user-mail">
              {{ user }}
            </div>
            <br />

            <q-btn
              class="outline-btn outline-mobile"
              label="My Profile"
              no-caps
              size="md"
              unelevated
              to="/user"
              color="black"
              style="text-transform: capitalize;"
            />

            <br />

            <q-btn
              class="outline-btn"
              label="Logout"
              style="text-transform: capitalize;"
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
    const userCrud = user_crud;
    const { logOut, user } = userCrud();

    return {
      logOut,
      user,
    };
  },
  name: 'Navigation',
};
</script>
