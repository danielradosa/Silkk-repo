import Cookies from 'js-cookie';
import { reactive, toRefs, ref } from 'vue';

const user = Cookies.get('userEmail');
const token = Cookies.get('userToken');

const projectCrud = () => {
    const state = reactive({
        Project: [],
    });

    const projID = ref(window.location.hash).value.slice(10) || '/'
    const projectTitle = ref(state.Project.toString());

    type Project = {
        title: string;
        author: string;
        description: string;
        deadline: Date;
    };

    type GetProjectResponse = {
        data: Project[];
    };

    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    const urlAll = 'https://sill-api-app.herokuapp.com/api/project/all/' + `${user}`;
    const urlSingle = `https://sill-api-app.herokuapp.com/api/project/${projID}`;

    // GET ALL USERS PROJECTS /////////////////////////////////
    async function getAll() {
        try {
            const response = await fetch(urlAll, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'auth-token': token as string
                },
            });

            if (!response.ok) {
                throw new Error(`Error! status: ${response.status}`);
            }

            const result = (await response.json()) as GetProjectResponse;
            console.log(JSON.stringify(result, null, 4));
            // @ts-expect-error: Unreachable code error
            state.Project = result;
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

    // GET SINGLE USERS PROJECT /////////////////////////////////
    async function getSingle() {
        try {
          const response = await fetch(urlSingle, {
            method: 'GET',
            headers: {
              Accept: 'application/json',
              'auth-token': token as string 
            },
          });
  
          if (!response.ok) {
            throw new Error(`Error! status: ${response.status}`);
          }
  
          const result = (await response.json()) as GetProjectResponse;
     
          // @ts-expect-error: Unreachable code error
          state.Project = result;
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
        projectTitle,
        getAll,
        urlAll,
        urlSingle,
        user,
        token,
        getSingle,
        ...toRefs(state),
        projID
    }
}

export default projectCrud