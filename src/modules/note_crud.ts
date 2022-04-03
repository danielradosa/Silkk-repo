/*

import { reactive, ref, toRefs } from 'vue'
import Cookies from 'js-cookie'

const notesCrud = () => {
    
    const stateNote = reactive({
        Note: []
    })

    const projID = ref(window.location.hash).value.slice(10) || '/';

    const noteTitle = ref('');
    const noteContent = ref('');
    
    type Note = {
        noteTitle: string,
        content: string
    }

    // Create a note
    
    // Delete a note

    // Get all notes
    
    return {
        noteTitle,
        noteContent,
        ...toRefs(state),
        projID,

    }
}

export default notesCrud;


*/