import { ref } from 'vue';
import { useQuasar } from 'quasar';
import axios from 'axios';

const user = () => {
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
                    .post('http://localhost:4000/api/user/register', {
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
                            3000
                        );
                        setTimeout(
                            () =>
                                $q.notify({ type: 'positive', message: 'Please login now' }),
                            6000
                        );
                        console.log(res);
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
}

export default user