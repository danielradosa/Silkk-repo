import { ref } from 'vue';
import { useQuasar } from 'quasar';
import axios from 'axios';
import Cookies from 'js-cookie';

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

      async signUp() {
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

      async logIn() {
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
              // Auth token

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
              Cookies.set('userEmail', `${email.value}`, { expires: 7, path: '' });
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