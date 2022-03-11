<template>
    <q-bar class="navigation">
        <div class="q-pa-md">
            <span class="kream-logo"><b>Silkk™</b> | project management tool</span>
        </div>
        <q-space />
        <div class="q-pa-md">
            <q-btn class="outline-btn" outline to="/" label="Sign Up" no-caps size="md" unelevated />
        </div>
    </q-bar>

    <div class="bg">
    <div class="div"></div>
     <div class="left">
            <h2 class="info">
                Fill it out. <br>
                Type carefully. <br> 
                Got everything ? <br>
               Login then.
            </h2>
        </div>
        <div class="right">
            <q-form @submit="onSubmit" 
                    class="q-gutter-md form"
                    autocorrect="off"
                    autocapitalize="off"
                    spellchech="false">

                <q-input filled color="black" v-model="email" label="Your Email *" hint="Your Email" lazy-rules
                    :rules="['Please type something']" />

                <q-input v-model="password" filled color="black" :type="isPwd ? 'password' : 'text'"
                    hint="Your Password">
                    <template v-slot:append>
                        <q-icon :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer"
                            @click="isPwd = !isPwd" />
                    </template>
                </q-input>

                <div>
                    <q-btn label="Login" type="submit" class="outline-btn" outline unelevated />
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
        height="755px"
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
    const email = ref('');
    const password = ref('');

    return {
      slide: ref(1),
      autoplay: ref(true),
      email,
      password,
      isPwd: ref(true),

      async onSubmit() {
        // Check if fields are not empty
        if (
          email.value != null &&
          password.value != null
        ) {
          // Post data
          const send = await axios
            .post('https://sill-api-app.herokuapp.com/api/user/login', {
              email: email.value,
              password: password.value,
            })
            .then((res) => {
              // Show loader
              $q.loading.show();
              // Redirect
              setTimeout(() => (window.location.href = '#/projects'), 2000);
              // Hide Loader
              setTimeout(() => $q.loading.hide(), 3000);
              // Show success notification
              setTimeout(
                () =>
                  $q.notify({
                    type: 'positive',
                    message: 'You have logged in succesfully',
                  }),
                4000
              );
              console.log(res);
              localStorage.setItem('User: ', email.value);
            })
            .catch((error) => {
              $q.notify({
                type: 'negative',
                message: 'We could not log you in',
              });
              setTimeout(
                () =>
                  $q.notify({
                    type: 'negative',
                    message: 'Please check your details',
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
    @import "../styles/styles.scss";
</style>
