import Cookies from 'js-cookie';
import { reactive, toRefs, ref } from 'vue';
import { useQuasar } from 'quasar';

const user = Cookies.get('userEmail');
const token = Cookies.get('userToken');

const todoCrud = () => {
    const $q = useQuasar();

    // Current project ID
    const projID = ref(window.location.hash).value.slice(10) || '/';

    const state = reactive({
      Todos: [],
      newTask: ref(''),
    });

    type SetTodoUnDone = {
      status: boolean
    }

    type CreateTodoResponse = {
      taskTitle: string;
      status: boolean;
    }

    type SetTodoDone = {
      status: boolean;
    }

    type Todos = {
      taskTitle: string;
      status: boolean;
    };

    type GetTodosResponse = {
      data: Todos[];
    };

    // URLS
    const allTodosURL = `https://sill-api-app.herokuapp.com/api/project/todo/all/${projID}`;
    const completeTodoURL = `https://sill-api-app.herokuapp.com/api/project/todo/complete/${projID}/`;
    const uncompleteTodoURL = `https://sill-api-app.herokuapp.com/api/project/todo/uncomplete/${projID}/`;
    const deleteTodoURL = `https://sill-api-app.herokuapp.com/api/project/todo/delete/${projID}/`;
    const createTodoURL = `https://sill-api-app.herokuapp.com/api/project/todo/create/${projID}`;

    // Get all todos
    async function getTodos() {
      try {
        const response = await fetch(allTodosURL, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'auth-token': token as string
          },
        });
        if (!response.ok) {
          throw new Error(`Error! status: ${response.status}`);
        }
        const result = (await response.json()) as GetTodosResponse;
        // @ts-expect-error: Unreachable code error
        state.Todos = result;

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

    // Create todo
    async function createTodo() {
      try {
        const response = await fetch(createTodoURL, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'auth-token': token as string
          },
          body: JSON.stringify({
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
        void getTodos();

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
    async function completeTodo(_id: string) {
      try {
        const response = await fetch(completeTodoURL + _id, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            'auth-token': token as string
          },
          body: JSON.stringify({
            status: true,
          }),
        });
  
        if (!response.ok) {
          throw new Error(`Error! status: ${response.status}`);
        }
  
        const result = (await response.json()) as SetTodoDone;
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
    async function uncompleteTodo(_id: string) {
      try {
        const response = await fetch(uncompleteTodoURL + _id, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            'auth-token': token as string
          },
          body: JSON.stringify({
            status: false,
          }),
        });

        if (!response.ok) {
          throw new Error(`Error! status: ${response.status}`);
        }

        const result = (await response.json()) as SetTodoUnDone;
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
    async function deleteTodo(_id: string, index: number) {
      try {
        const response = await fetch(deleteTodoURL + _id, {
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

        const result = (await response.json()) as GetTodosResponse;
        
        state.Todos.splice(index, 1);

        $q.notify('Todo deleted');

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
        createTodo,
        $q,
        deleteTodo,
        uncompleteTodo,
        completeTodo,
        allTodosURL,
        getTodos,
        user,
        token,
        ...toRefs(state),
        projID
    }
}

export default todoCrud