import Cookies from 'js-cookie';
import { reactive, toRefs, ref } from 'vue';
import { useQuasar } from 'quasar';

const user = Cookies.get('userEmail');
const token = Cookies.get('userToken');

const listCrud = () => {
    const $q = useQuasar();

    // Current project ID
    const projID = ref(window.location.hash).value.slice(10) || '/';

    const state = reactive({
        Lists: [],
        listTitle: '' as string,
        newTask: ref(''),
        Todos: []
    });

    type CreateListResponse = {
        listTitle: string;
    }

    type Lists = {
        listTitle: string;
    };

    type GetListsResponse = {
        data: Lists[];
    };

    type CreateTodoResponse = {
        taskTitle: string;
        status: boolean;
    }

    // URLS
    const allListsURL = `https://sill-api-app.herokuapp.com/api/project/list/all/${projID}`;
    const createListURL = `https://sill-api-app.herokuapp.com/api/project/list/create/${projID}`;
    const deleteListURL = `https://sill-api-app.herokuapp.com/api/project/list/delete/${projID}/`;
    const createTodoURL = `https://sill-api-app.herokuapp.com/api/project/list/task/create/${projID}/`;
    const completeTodoURL = `https://sill-api-app.herokuapp.com/api/project/list/task/complete/${projID}/`;
    const uncompleteTodoURL = `https://sill-api-app.herokuapp.com/api/project/list/task/uncomplete/${projID}/`;
    const deleteTodoURL = `https://sill-api-app.herokuapp.com/api/project/list/task/delete/${projID}/`;

    // Create todo
    async function createTodo(_id: string) {
        try {
            const response = await fetch(createTodoURL + _id, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'auth-token': token as string
                },
                body: JSON.stringify({
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                    taskTitle: state.newTask,
                    status: false,
                }),
            });
            if (!response.ok) {
                throw new Error(`Error! status: ${response.status}`);
            }
            const result = (await response.json()) as CreateTodoResponse;

            // @ts-expect-error: Unreachable code error
            state.Todos.push(result);
            reactive(state).newTask = '';
            void getLists();
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

    // Complete todo
    async function completeTodo(_id: string, _idTodo: string) {
        try {
            const response = await fetch(completeTodoURL + _id + '/' + _idTodo, {
                method: 'PUT',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'auth-token': token as string
                },
                body: JSON.stringify({
                    status: true,
                }),
            });
            if (!response.ok) {
                throw new Error(`Error! status: ${response.status}`);
            }
            const result = (await response.json()) as CreateTodoResponse;
            // @ts-expect-error: Unreachable code error
            state.Todos.push(result);
            reactive(state).newTask = '';
            void getLists();
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

    // Uncomplete todo
    async function uncompleteTodo(_id: string, _idTodo: string) {
        try {
            const response = await fetch(uncompleteTodoURL + _id + '/' + _idTodo, {
                method: 'PUT',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'auth-token': token as string
                },
                body: JSON.stringify({
                    status: true,
                }),
            });
            if (!response.ok) {
                throw new Error(`Error! status: ${response.status}`);
            }
            const result = (await response.json()) as CreateTodoResponse;
            // @ts-expect-error: Unreachable code error
            state.Todos.push(result);
            reactive(state).newTask = '';
            void getLists();
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

    // Delete todo
    async function deleteTodo(_id: string, _idTodo: string) {
        try {
            const response = await fetch(deleteTodoURL + _id + '/' + _idTodo, {
                method: 'DELETE',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'auth-token': token as string
                },
            });
            if (!response.ok) {
                throw new Error(`Error! status: ${response.status}`);
            }
            const result = (await response.json()) as CreateTodoResponse;
            // @ts-expect-error: Unreachable code error
            state.Todos.push(result);
            reactive(state).newTask = '';
            void getLists();
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

    // Get all lists
    async function getLists() {
        try {
            const response = await fetch(allListsURL, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'auth-token': token as string
                },
            });
            if (!response.ok) {
                throw new Error(`Error! status: ${response.status}`);
            }
            const result = (await response.json()) as GetListsResponse;
            // @ts-expect-error: Unreachable code error
            state.Lists = result;
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

    // Create list
    async function createList() {
        try {
            const response = await fetch(createListURL, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'auth-token': token as string
                },
                body: JSON.stringify({
                    listTitle: state.listTitle
                }),
            });
            if (!response.ok) {
                throw new Error(`Error! status: ${response.status}`);
            }
            const result = (await response.json()) as CreateListResponse;
            // @ts-expect-error: Unreachable code error
            state.Lists.push(result);
            void getLists();
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

    // Delete list
    async function deleteList(_id: string, index: number) {
        try {
            const response = await fetch(deleteListURL + _id, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    'auth-token': token as string
                },
            });

            if (!response.ok) {
                throw new Error(`Error! status: ${response.status}`);
            }

            const result = (await response.json()) as GetListsResponse;
            state.Lists.splice(index, 1);
            $q.notify('List deleted');

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

    return {
        deleteTodo,
        createList,
        completeTodo,
        uncompleteTodo,
        createTodo,
        $q,
        deleteList,
        allListsURL,
        getLists,
        user,
        token,
        ...toRefs(state),
        projID
    }
}

export default listCrud