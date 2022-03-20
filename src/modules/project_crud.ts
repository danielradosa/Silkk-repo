import { ref, reactive, toRefs } from 'vue';
import { useQuasar } from 'quasar';

// EDIT PROJECT TITLE
const projectCrud = () => {
    const $q = useQuasar();
    const title = ref('');

    const state = reactive({
        Project: [],
    });

    type UpdateProjectResponse = {
        title: string;
    };

    const editTitle = async () => {
        try {
            const response = await fetch('https://sill-api-app.herokuapp.com/api/project/622b1a17a900330b46af2203', {
                method: 'PUT',
                body: JSON.stringify({
                    title: 'Really Amazing Project',
                }),
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
            });
            const result = (await response.json()) as UpdateProjectResponse;
            console.log('result is: ', JSON.stringify(result, null, 4));
            $q.notify({
                type: 'positive',
                message: 'Title updated',
            });
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
        title,
        editTitle,
        ...toRefs(state),
    }
}

export default projectCrud