<template>
  <div class="projects">
    <div class="text-h3 project-title">
      Favourite Projects <q-icon name="star" color="yellow" />
    </div>
  </div>

  <div class="project-container">
    <div class="q-pa-md project-card">
      <q-card class="my-card single-projects no-shadow no-border-radius">
        <q-img
          src="https://res.cloudinary.com/practicaldev/image/fetch/s--9yBkqrjS--/c_imagga_scale,f_auto,fl_progressive,h_500,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/nphrgz8yfnjylrwfr0yl.png"
        >
          <div class="absolute-bottom">
            <div class="text-h6">
              Damn good project
              <q-icon name="star" color="yellow" />
            </div>
            <div class="text-subtitle2">by Big Boi</div>
          </div>
        </q-img>

        <q-card-actions class="project-btns">
          <q-btn
            unelevated
            size="md"
            class="open-btn no-border-radius dropdown-btn"
            >Open</q-btn
          >
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
                <span class="q-ml-sm"
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

  <div v-for="item in items" :key="item.name" class="project-container">
    <div class="q-pa-md project-card">
      <q-card class="my-card single-projects no-shadow no-border-radius">
        <q-img
          src="https://res.cloudinary.com/practicaldev/image/fetch/s--9yBkqrjS--/c_imagga_scale,f_auto,fl_progressive,h_500,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/nphrgz8yfnjylrwfr0yl.png"
        >
          <div class="absolute-bottom">
            <div class="text-h6">{{ item.name }}</div>
            <div class="text-subtitle2">by {{ item.author }}</div>
          </div>
        </q-img>

        <q-card-actions class="project-btns">
          <q-btn
            unelevated
            size="md"
            class="open-btn no-border-radius dropdown-btn"
            :to="{ path: '/project/' + item.id}"
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
</template>

<script lang="ts">
import { ref } from 'vue';
 export default {
  name: 'myProjects',
  setup() {
    return {
      confirm: ref(false),
      items: [
        { name: 'good project', id: '622b1a17a900330b46af2203', author: 'You', created: '2017-05-12T23:28:56.782Z' },
        { name: 'okay fine', id: '622b1dd55e23ccf87cec134d', author: 'Tray', created: '2014-03-06T23:28:56.782Z' },
        { name: 'let me see', id: '538s3fg4782f', author: 'You', created: '2022-01-21T23:28:56.782Z' },
      ],
    };
  },
};
</script>
