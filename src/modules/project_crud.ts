import Cookies from 'js-cookie';
import { reactive, toRefs, ref } from 'vue';
import { useQuasar } from 'quasar';

const user = Cookies.get('userEmail');
const token = Cookies.get('userToken');

const projectCrud = () => {
  const $q = useQuasar();

  const state = reactive({
    Project: [],
    Author: []
  });

  const projID = ref(window.location.hash).value.slice(10) || '/';

  const projectTitle = ref('');
  const projectDescription = ref('');
  const projectDate = ref('');

  type Author = {
    name: string;
  };

  type GetAuthorResponse = {
    data: Author[];
  }

  type UpdateProjectTitle = {
    title: string;
  }

  type SetProjectFavourite = {
    favourite: boolean;
  }

  type CreateProjectResponse = {
    title: string;
    favourite: boolean;
    authorEmail: string;
    description: string;
    deadline: string;
  };

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
  const urlAll = `https://sill-api-app.herokuapp.com/api/project/all/${user}`;
  const urlSingle = `https://sill-api-app.herokuapp.com/api/project/${projID}`;
  const urlDelete = 'https://sill-api-app.herokuapp.com/api/project/delete/';
  const urlCreate = 'https://sill-api-app.herokuapp.com/api/project/create/';
  const urlFave = 'https://sill-api-app.herokuapp.com/api/project/addfavorite/';
  const urlRemoveFave = 'https://sill-api-app.herokuapp.com/api/project/removefavorite/';
  const urlUpdateTitle = 'https://sill-api-app.herokuapp.com/api/project/updatetitle/';
  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
  const author_URL = `https://sill-api-app.herokuapp.com/api/user/${user}`;

  // GET CURRENT USER ///////////////////////////////////////////////////////////////////////
  async function getAuthor() {
    try {
      const response = await fetch(author_URL, {
        method: 'GET',
      });

      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
      }

      const result = (await response.json()) as GetAuthorResponse;
      // @ts-expect-error: Unreachable code error
      state.Author = result;
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

  // DELETE SINGLE USERS PROJECT /////////////////////////////////
  async function deleteProject(_id: string) {
    console.log(_id)
    try {
      const response = await fetch(urlDelete + _id, {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          'auth-token': token as string,
        }

      });

      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
      }

      $q.loading.show();
      setTimeout(() => (location.reload()), 1000);
      setTimeout(() => $q.loading.hide(), 2000);

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

  // CREATE NEW PROJECT ////////////////////////////////////////
  async function createProject() {
    try {
      const response = await fetch(urlCreate, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'auth-token': token as string
        },
        body: JSON.stringify({
          title: projectTitle.value,
          favourite: false,
          description: projectDescription.value,
          deadline: projectDate.value,
          authorEmail: user,
        }),
      });

      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
      }

      const result = (await response.json()) as CreateProjectResponse;
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

  // ADD TO FAVOURITES PROJECT ////////////////////////////////////////
  async function addToFavourites(_id: string) {
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

  // REMOVE FROM FAVOURITES PROJECT ////////////////////////////////////////
  async function removeFromFavourites(_id: string) {
    try {
      const response = await fetch(urlRemoveFave + _id, {
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

  // UPDATE PROJECT TITLE ////////////////////////////////////////
  async function updateProjectTitle(_id: string, projectTitle: string) {
    try {
      const response = await fetch(urlUpdateTitle + _id, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'auth-token': token as string
        },
        body: JSON.stringify({
          title: projectTitle
        }),
      });

      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
      }

      const result = (await response.json()) as UpdateProjectTitle;
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
    updateProjectTitle,
    urlUpdateTitle,
    getAuthor,
    removeFromFavourites,
    urlRemoveFave,
    addToFavourites,
    projectTitle,
    projectDescription,
    projectDate,
    getAll,
    urlFave,
    urlAll,
    urlSingle,
    user,
    token,
    getSingle,
    urlDelete,
    deleteProject,
    urlCreate,
    createProject,
    ...toRefs(state),
    projID
  }
}

export default projectCrud