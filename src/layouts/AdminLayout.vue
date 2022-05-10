/* eslint-disable @typescript-eslint/no-unsafe-member-access */ /*
eslint-disable @typescript-eslint/no-unsafe-assignment */
<template>
  <q-bar class="navigation">
    <div class="q-pa-md">
      <span class="kream-logo"><b>Silkk™</b> | project management tool</span>
    </div>
  </q-bar>

  <div class="bg">
    <div class="right">
      <q-form
        @submit="logIn"
        class="q-gutter-md form"
        autocorrect="off"
        autocapitalize="off"
        spellchech="false"
      >
        <q-input
          filled
          color="black"
          v-model="email"
          label="Your Email *"
          hint="Your Email"
          lazy-rules
          :rules="['Please type something']"
        />

        <q-input
          v-model="password"
          filled
          color="black"
          :type="isPwd ? 'password' : 'text'"
          hint="Your Password"
        >
          <template v-slot:append>
            <q-icon
              :name="isPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwd = !isPwd"
            />
          </template>
        </q-input>

        <div>
          <q-btn
            label="Login"
            type="submit"
            class="outline-btn"
            outline
            unelevated
          />
        </div>
      </q-form>
    </div>
  </div>
</template>

<script lang="ts">
import admin_crud from 'src/modules/admin_crud';
export default {
  setup() {
    const adminCrud = admin_crud;
    const { logIn, logOut, email, password, isPwd } = adminCrud();

    return {
      logIn,
      logOut,
      email,
      password,
      isPwd
    };
  },

  name: 'adminPanel',
};
</script>

<style lang="scss">
@import '../styles/styles.scss';
</style>
