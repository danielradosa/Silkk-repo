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
        <br />
        So what are you waiting for ? <br />
        Try it now & don't forget to tell your friends.
      </h2>
    </div>
    <div class="right">
      <q-form
        @submit.prevent="onSubmit"
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
      height="663px"
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
import { ref } from 'vue';
import { useQuasar } from 'quasar';
import axios from 'axios';

export default {
  setup() {
    const $q = useQuasar();
    const name = ref('');
    const email = ref('');
    const password = ref('');

    return {
      slide: ref(1),
      autoplay: ref(true),
      name,
      email,
      password,
      isPwd: ref(true),

      async onSubmit() {
        // Check if fields are not empty
        if (
          name.value != null &&
          email.value != null &&
          password.value != null
        ) {
          // Post data
          const send = await axios
            .post('https://sill-api-app.herokuapp.com/api/user/register', {
              name: name.value,
              email: email.value,
              password: password.value,
            })
            .then((res) => {
              // Show loader
              $q.loading.show();
              // Redirect
              setTimeout(() => (window.location.href = '#/login'), 2000);
              // Hide Loader
              setTimeout(() => $q.loading.hide(), 3000);
              // Show success notification
              setTimeout(
                () =>
                  $q.notify({
                    type: 'positive',
                    message: 'Account created succesfully',
                  }),
                4000
              );
              setTimeout(
                () =>
                  $q.notify({ type: 'positive', message: 'Please login now' }),
                6000
              );
              console.log(res);
              localStorage.setItem('User: ', name.value);
            })
            .catch((error) => {
              $q.notify({
                type: 'negative',
                message: 'Account could not be created',
              });
              setTimeout(
                () =>
                  $q.notify({
                    type: 'negative',
                    message: 'Email already exists',
                  }),
                2000
              );
              console.log(error);
            });
          console.warn(send);
        } else {
          $q.notify({
            type: 'negative',
            message: 'Please check your details',
          });
        }
      },
    };
  },
};
</script>

<style lang="scss">
@import '../styles/styles.scss';
</style>
