import { ref } from 'vue';
import { useQuasar } from 'quasar';
import axios from 'axios';
import Cookies from 'js-cookie';

const userCrud = () => {
    const $q = useQuasar();
    const name = ref('');
    const email = ref('');
    const password = ref('');
    const user = Cookies.get('userEmail');
    const userToken = Cookies.get('userToken');
    const login_URL = 'https://sill-api-app.herokuapp.com/api/user/login';
    const register_URL = 'https://sill-api-app.herokuapp.com/api/user/register';

    // SIGNUP ////////////////////////////////////////////////////////////////////////////////
    const signUp = async () => {
        // Check if fields are not empty
        if (
            name.value != null &&
            email.value != null &&
            password.value != null
        ) {
            // Post data
            const send = await axios
                .post(register_URL, {
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
    }
    
    // LOGIN ////////////////////////////////////////////////////////////////////////////////////
    const logIn = async () => {
        // Check if fields are not empty
        if (
            email.value != null &&
            password.value != null
        ) {
            // Post data
            const send = await axios
                .post(login_URL, {
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
                    // eslint-disable-next-line
                    Cookies.set('userToken', `${res.data.data.token}`, { expires: 7, path: '' });
                    Cookies.set('userEmail', `${email.value}`, { expires: 7, path: '' });
                    setTimeout(() => (window.location.reload()), 2000)
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
    }

    // LOGOUT ///////////////////////////////////////////////////////////////////////////////
    const logOut = () => {
        if (user) {
            $q.loading.show();
            // Remove Cookie
            Cookies.remove('userEmail');
            Cookies.remove('userToken');
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
            setTimeout(() => (window.location.reload()), 2000)
        }
    }

    return {
        slide: ref(1),
        autoplay: ref(true),
        name,
        email,
        password,
        isPwd: ref(true),
        signUp,
        logIn,
        logOut,
        user,
        userToken
    };
}

export default userCrud;