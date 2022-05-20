import { ref, reactive, toRefs } from 'vue';
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
    const allUsers_URL = 'https://sill-api-app.herokuapp.com/api/user/';
    const deleteUser_URL = 'https://sill-api-app.herokuapp.com/api/user/delete/';
    const specificUser_URL = `https://sill-api-app.herokuapp.com/api/user/${user as string}`;
    const token = Cookies.get('userToken');

    const state = reactive({
        Users: [],
        Admin: []
    });

    type GetUsersResponse = {
        data: Users[];
    };

    type Users = {
        name: string;
        email: string;
        password: string;
        userProjects: string[];
        _v: number;
        admin: boolean;
    };

    type GetAdminResponse = {
        data: Admin[];
    }

    type Admin = {
        admin: true;
        email: string;
    }

    // Get admin
    async function getAdmin() {
        try {
            const response = await fetch(specificUser_URL, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'auth-token': token as string
                },
            });
            if (!response.ok) {
                throw new Error(`Error! status: ${response.status}`);
            }
            const result = (await response.json()) as GetAdminResponse;
            // @ts-expect-error: Unreachable code error
            state.Admin = result;
            return result;
            
        } catch (error) {
            if (error instanceof Error) {
                console.log('error message: ', error.message);
                return error.message;
            } else {
                console.log('unexpected error: ', error);
                return 'An unexpected error occurred';
            }
        }
    }

    // GET ALL USERS ////////////////////////////////////////////////////////////////////////////
    async function getAllUsers() {
        try {
            const response = await fetch(allUsers_URL, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'auth-token': token as string
                },
            });
            if (!response.ok) {
                throw new Error(`Error! status: ${response.status}`);
            }
            const result = (await response.json()) as GetUsersResponse;
            // @ts-expect-error: Unreachable code error
            state.Users = result;
            return result;
            
        } catch (error) {
            if (error instanceof Error) {
                console.log('error message: ', error.message);
                return error.message;
            } else {
                console.log('unexpected error: ', error);
                return 'An unexpected error occurred';
            }
        }
    }

    // DELETE USER //////////////////////////////////////////////////////////////////////////////
    const deleteUser = async (email: string) => {
        try {
            const response = await axios.delete(deleteUser_URL + email, {
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': token as string
                },
            });
            setTimeout(() => (window.location.reload()), 2000);
            // eslint-disable-next-line @typescript-eslint/no-unsafe-return
            return response.data;
            

        } catch (error) {
            console.log(error);
        }
    };

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
                    setTimeout(() => (window.location.href = '#/panel'), 2000);
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
        logIn,
        logOut,
        user,
        userToken,
        getAllUsers,
        deleteUser_URL,
        deleteUser,
        ...toRefs(state),
        getAdmin,
    };
}

export default userCrud;