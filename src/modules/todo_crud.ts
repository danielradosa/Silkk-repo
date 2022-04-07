import Cookies from 'js-cookie';
import { reactive, toRefs, ref } from 'vue';
//import { useQuasar } from 'quasar';

const user = Cookies.get('userEmail');
const token = Cookies.get('userToken');

const todoCrud = () => {
    //const $q = useQuasar();

    // Current project ID
    const projID = ref(window.location.hash).value.slice(10) || '/';

    const state = reactive({
      Todos: [],
    });

    type Todos = {
      taskTitle: string;
      status: boolean;
    };

    type GetTodosResponse = {
      data: Todos[];
    };

    // URLS
    const allTodosURL = `https://sill-api-app.herokuapp.com/api/project/todo/all/${projID}`;
    const completeTodoURL = `https://sill-api-app.herokuapp.com/api/project/todo/complete/${projID}`;

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

    // Complete todo
    async function completeTodo(_id: string) {
      try {
        const response = await fetch(urlFave + _id, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            'auth-token': token as string
          },
          body: JSON.stringify({
            favourite: true,
          }),
        });
  
        if (!response.ok) {
          throw new Error(`Error! status: ${response.status}`);
        }
  
        location.reload();
  
        const result = (await response.json()) as SetProjectFavourite;
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
        allTodosURL,
        getTodos,
        user,
        token,
        ...toRefs(state),
        projID
    }
}

export default todoCrud