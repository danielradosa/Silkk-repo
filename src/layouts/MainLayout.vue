<template>
  <q-bar class="navigation">
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

  <div class="bg">
    <div class="left">
      <h2 class="info">
        Silkk™ is a free project management tool. <br />
        Think Tr*llo, but better. <br />
        <br class="q-ma-md" />
        So what are you waiting for ? <br />
        Try it now & don't forget to tell your friends.
      </h2>
    </div>
    <div class="right">
      <q-form
        @submit.prevent="signUp"
        class="q-gutter-md form"
        autocorrect="on"
        autocomplete="on"
        spellcheck="true"
      >
        <q-input
          filled
          color="black"
          v-model="name"
          name="name"
          label="Full Name *"
          hint="Name and surname"
          lazy-rules
          :rules="[
            (val) =>
              (val && val.length > 4) ||
              'Name must be longer than 4 characters.',
          ]"
        />

        <q-input
          filled
          color="black"
          v-model="email"
          name="email"
          type="email"
          label="Your Email *"
          hint="Your Email"
          lazy-rules
          :rules="[
            (val) =>
              (val && val.length > 9) ||
              'Mail must be longer than 9 characters',
          ]"
        />

        <q-input
          v-model="password"
          name="password"
          filled
          color="black"
          :rules="[
            (val) =>
              (val && val.length > 6) ||
              'Password must be longer than 6 characters',
          ]"
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
            label="Sign Up"
            type="submit"
            class="outline-btn"
            outline
            unelevated
          />
        </div>
      </q-form>
    </div>
  </div>

  <div class="carousel">
    <q-carousel
      v-model="slide"
      transition-prev="slide-right"
      transition-next="slide-left"
      infinite
      :autoplay="autoplay"
      swipeable
      animated
      control-color="white"
      prev-icon="arrow_left"
      next-icon="arrow_right"
      navigation-icon="radio_button_unchecked"
      navigation
      padding
      arrows
      class="bg-crsl text-white"
      @mouseenter="autoplay = false"
      @mouseleave="autoplay = true"
    >
      <q-carousel-slide :name="1" class="column no-wrap flex-center">
        <q-icon name="check" size="56px" />
        <div class="q-mt-md text-center">
          <h1>Always Free</h1>
        </div>
      </q-carousel-slide>
      <q-carousel-slide :name="2" class="column no-wrap flex-center">
        <q-icon name="check" size="56px" />
        <div class="q-mt-md text-center">
          <h1>Never Slow</h1>
        </div>
      </q-carousel-slide>
      <q-carousel-slide :name="3" class="column no-wrap flex-center">
        <q-icon name="check" size="56px" />
        <div class="q-mt-md text-center">
          <h1>Sometimes Funny</h1>
        </div>
      </q-carousel-slide>
    </q-carousel>
  </div>
</template>

<script lang="ts">
import user_crud from 'src/modules/user_crud';

export default {
  setup() {
    const userCrud = user_crud;
    const {
      name,
      email,
      password,
      logIn,
      isPwd,
      slide,
      autoplay,
      user,
      signUp,
    } = userCrud();

    return {
      name,
      userCrud,
      email,
      password,
      logIn,
      signUp,
      isPwd,
      slide,
      autoplay,
      user,
    };
  },
};
</script>

<style lang="scss">
@import '../styles/styles.scss';
</style>
