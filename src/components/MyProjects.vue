<template>
  <div v-if="user">
    <div class="projects">
      <div class="text-h3 project-title">Favourite Projects</div>
    </div>

    <div class="project-container" v-for="item in Project" :key="item">
      <div class="q-pa-md project-card" v-if="item.favourite == true">
        <q-card class="my-card single-projects no-shadow no-border-radius">
          <q-img
            src="https://media.istockphoto.com/photos/technology-network-picture-id1037573870?b=1&k=20&m=1037573870&s=612x612&w=0&h=QZ8vJf1TxY5GWeIRS7ZUj9jg2GOTGOjp4RZo_chEoD4="
          >
            <div class="absolute-bottom">
              <div class="text-h6">
                {{ item.title as string }} <q-icon class="fav-star" name="star" color="yellow" @click="removeFromFavourites(item._id as string)" />
              </div>
              <div class="text-subtitle2">by {{ Author.data.name }}</div>
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
              @click="deleteProject(item._id as any)"
              >Delete</q-btn
            >    
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
            src="https://media.istockphoto.com/photos/technology-network-picture-id1037573870?b=1&k=20&m=1037573870&s=612x612&w=0&h=QZ8vJf1TxY5GWeIRS7ZUj9jg2GOTGOjp4RZo_chEoD4="
          >
            <div class="absolute-bottom">
              <div class="text-h6">
                {{ item.title as string }} 
                <q-icon class="star" name="star" color="grey" @click="addToFavourites(item._id as string)" />
              </div>
              <div class="text-subtitle2">by {{ Author.data.name }}</div>
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
