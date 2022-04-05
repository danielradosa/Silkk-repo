import Cookies from 'js-cookie';
import { reactive, toRefs, ref } from 'vue';
//import { useQuasar } from 'quasar';

const user = Cookies.get('userEmail');
const token = Cookies.get('userToken');

const todoCrud = () => {
    //const $q = useQuasar();

    const state = reactive({
        Todo: [],
    });

    type CreateTodoResponse = {
        taskTitle: string;
    };

    const projID = ref(window.location.hash).value.slice(10) || '/';

    // CREATE NEW TODO LIST ////////////////////////////////////////
    async function createTodo(todo: string) {
        try {
          const response = await fetch('url', {
            method: 'POST',
            body: JSON.stringify({
              title: todo,
              authorEmail: user,
            }),
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
              'auth-token': token as string
            }
          });
    
          if (!response.ok) {
            throw new Error(`Error! status: ${response.status}`);
          }
    
          const result = (await response.json()) as CreateTodoResponse;
    
          window.location.href ='#/projects';
    
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
        user,
        token,
        ...toRefs(state),
        projID
    }
}

export default todoCrud