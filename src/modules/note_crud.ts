import Cookies from 'js-cookie';
import { reactive, toRefs, ref } from 'vue';
import { useQuasar } from 'quasar';

const user = Cookies.get('userEmail');
const token = Cookies.get('userToken');

const noteCrud = () => {
    const $q = useQuasar();

    // Current project ID
    const projID = ref(window.location.hash).value.slice(10) || '/';

    const state = reactive({
        Notes: [],
        noteTitle: '' as string,
        noteContent: '' as string,
    });

    type CreateNoteResponse = {
        title: string;
        content: string;
    }

    type Notes = {
        title: string;
        content: string;
    };

    type GetNotesResponse = {
        data: Notes[];
    };


    // URLS
    const allNotesURL = `https://sill-api-app.herokuapp.com/api/project/notes/all/${projID}`;
    const deleteNoteURL = `https://sill-api-app.herokuapp.com/api/project/note/delete/${projID}/`;
    const createNoteURL = `https://sill-api-app.herokuapp.com/api/project/note/create/${projID}`;

    // Get all notes
    async function getNotes() {
        try {
            const response = await fetch(allNotesURL, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'auth-token': token as string
                },
            });
            if (!response.ok) {
                throw new Error(`Error! status: ${response.status}`);
            }
            const result = (await response.json()) as GetNotesResponse;
            // @ts-expect-error: Unreachable code error
            state.Notes = result;
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

    // Create note
    async function createNote() {
        try {
            const response = await fetch(createNoteURL, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'auth-token': token as string
                },
                body: JSON.stringify({
                    noteTitle: state.noteTitle,
                    content: state.noteContent,
                }),
            });
            if (!response.ok) {
                throw new Error(`Error! status: ${response.status}`);
            }
            const result = (await response.json()) as CreateNoteResponse;
            // @ts-expect-error: Unreachable code error
            state.Notes.push(result);

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

    // Delete note
    async function deleteNote(_id: string, index: number) {
        try {
            const response = await fetch(deleteNoteURL + _id, {
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

            const result = (await response.json()) as GetNotesResponse;
            state.Notes.splice(index, 1);
            $q.notify('Note deleted');

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
        createNote,
        $q,
        deleteNote,
        allNotesURL,
        getNotes,
        user,
        token,
        ...toRefs(state),
        projID
    }
}

export default noteCrud