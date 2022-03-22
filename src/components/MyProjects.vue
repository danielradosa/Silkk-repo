<template>
  <div v-if="user">
    <div class="projects">
      <div class="text-h3 project-title">Favourite Projects</div>
    </div>

    <div class="project-container" v-for="project in Project" :key="project">
      <div class="q-pa-md project-card" v-if="project.favourite == true">
        <q-card class="my-card single-projects no-shadow no-border-radius">
          <q-img
            src="https://res.cloudinary.com/practicaldev/image/fetch/s--9yBkqrjS--/c_imagga_scale,f_auto,fl_progressive,h_500,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/nphrgz8yfnjylrwfr0yl.png"
          >
            <div class="absolute-bottom">
              <div class="text-h6">
                {{ project.title }} <q-icon class="star" name="star" color="yellow" />
              </div>
              <div class="text-subtitle2">by {{ project.author }}</div>
            </div>
          </q-img>

          <q-card-actions class="project-btns">
            <q-btn
              unelevated
              size="md"
              class="open-btn no-border-radius dropdown-btn"
              :to="{ path: '/project/' + `${project._id}` }"
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
                    @click="projectDelete"
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

    <div class="project-container" v-for="project in Project" :key="project">
      <div class="q-pa-md project-card" v-if="project.favourite == false">
        <q-card class="my-card single-projects no-shadow no-border-radius">
          <q-img
            src="https://res.cloudinary.com/practicaldev/image/fetch/s--9yBkqrjS--/c_imagga_scale,f_auto,fl_progressive,h_500,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/nphrgz8yfnjylrwfr0yl.png"
          >
            <div class="absolute-bottom">
              <div class="text-h6">
                {{ project.title }} <q-icon class="star" name="star" color="grey" />
              </div>
              <div class="text-subtitle2">by {{ project.author }}</div>
            </div>
          </q-img>

          <q-card-actions class="project-btns">
            <q-btn
              unelevated
              size="md"
              class="open-btn no-border-radius dropdown-btn"
              :to="{ path: '/project/' + `${project._id}`, params: {id: `${project._id}`} }"
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
                    @click="projectDelete"
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
import Cookies from 'js-cookie';
import { reactive, toRefs, ref } from 'vue';
import moment from 'moment';
//import axios from 'axios'

const user = Cookies.get('userEmail');
const token = Cookies.get('userToken');

export default {
  setup() {
    const state = reactive({
      Project: [],
    });

    const projectTitle = ref(state.Project.toString());

    var time = moment('2019-11-03T05:00:00.000Z').utc().format('DD.MM.YYYY');

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
    const url = 'https://sill-api-app.herokuapp.com/api/project/all/' + `${user}`;

    async function getProject() {
      try {
        const response = await fetch(url, {
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

    void getProject();

    console.log();

    return {
      projectTitle,
      getProject,
      url,
      user,
      time,
      token,
      ...toRefs(state),
    };
  },

  name: 'singleProject',
};
</script>
