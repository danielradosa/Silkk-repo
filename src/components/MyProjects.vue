<template>
  <div v-if="user">
    <div class="projects">
      <div class="text-h3 project-title">Favourite Projects</div>
    </div>

    <div class="project-container" v-for="item in Project" :key="item">
      <div class="q-pa-md project-card" v-if="item.favourite == true">
        <q-card class="my-card single-projects no-shadow no-border-radius">
          <q-img
            src="https://res.cloudinary.com/practicaldev/image/fetch/s--9yBkqrjS--/c_imagga_scale,f_auto,fl_progressive,h_500,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/nphrgz8yfnjylrwfr0yl.png"
          >
            <div class="absolute-bottom">
              <div class="text-h6">
                {{ item.title as string }} <q-icon class="star" name="star" color="yellow" @click="removeFromFavourites(item._id as string)" />
              </div>
              <div class="text-subtitle2">by {{ Author.name }}</div>
            </div>
          </q-img>

          <q-card-actions class="project-btns">
            <q-btn
              unelevated
              size="md"
              class="open-btn no-border-radius dropdown-btn"
              :to="{ path: '/project/' + `${item._id as string}` }"
              >Open
            </q-btn>

            <q-btn
              flat
              no-caps
              unelevated
              size="md"
              class="delete-btn no-border-radius"
              color="red"
              @click="confirm = true"
              >Delete</q-btn
            >

            <q-dialog v-model="confirm" persistent class="dialog no-shadow">
              <q-card>
                <q-card-section class="row items-center">
                  <span class="q-ml-sm text-dark"
                    >Are you sure you want to delete this project?</span
                  >
                </q-card-section>

                <q-card-actions align="center">
                  <q-btn
                    flat
                    no-caps
                    label="Cancel"
                    color="black"
                    class="no-border-radius"
                    v-close-popup
                  />
                  <q-btn
                    flat
                    no-caps
                    @click="deleteProject(item[0]._id as any)"
                    label="Delete"
                    color="red"
                    class="no-border-radius"
                    v-close-popup
                  />
                </q-card-actions>
              </q-card>
            </q-dialog>
          </q-card-actions>
        </q-card>
      </div>
    </div>
    
    <div class="projects">
      <div class="text-h3 project-title">All Projects</div>
    </div>

    <div class="project-container" v-for="item in Project" :key="item">
      <div class="q-pa-md project-card" v-if="item.favourite == false">
        <q-card class="my-card single-projects no-shadow no-border-radius">
          <q-img
            src="https://res.cloudinary.com/practicaldev/image/fetch/s--9yBkqrjS--/c_imagga_scale,f_auto,fl_progressive,h_500,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/nphrgz8yfnjylrwfr0yl.png"
          >
            <div class="absolute-bottom">
              <div class="text-h6">
                {{ item.title as string }} 
                <q-icon class="star" name="star" color="grey" @click="addToFavourites(item._id as string)" />
              </div>
              <div class="text-subtitle2">by {{ Author.name }}</div>
            </div>
          </q-img>

          <q-card-actions class="project-btns">
            <q-btn
              unelevated
              size="md"
              class="open-btn no-border-radius dropdown-btn"
              :to="{ path: '/project/' + `${item._id as string}`}"
              >Open
            </q-btn>
            <q-btn
              flat
              no-caps
              unelevated
              size="md"
              class="delete-btn no-border-radius"
              color="red"
              @click="deleteProject(item._id as any)"
              >Delete</q-btn
            >
          </q-card-actions>
        </q-card>
      </div>
    </div>
  </div>

  <div v-else>
    <h3 class="err">
      To access your projects, you need to either
      <router-link to="/" class="err-link">sign up</router-link> or
      <router-link to="/login" class="err-link">login</router-link>.
    </h3>
  </div>
</template>

<script lang="ts">
import project_crud from 'src/modules/project_crud'
import { ref } from 'vue'

export default {
  
  setup() {
    const projectCrud = project_crud
    const { removeFromFavourites, addToFavourites, Project, Author, projectTitle, urlAll, user, token, getAll, deleteProject, urlDelete, projID, getAuthor } = projectCrud();

    void getAll();
    void getAuthor();

    return {
      Author,
      addToFavourites,
      removeFromFavourites,
      projectCrud,
      projectTitle,
      getAll,
      getAuthor,
      urlAll,
      user,
      token,
      Project,
      deleteProject,
      urlDelete,
      projID,
      confirm: ref(false)
    };
  },

  name: 'singleProject',
};
</script>
