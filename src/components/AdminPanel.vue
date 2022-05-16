<template>
    <div class="container-admin">

      <div v-if="Admin.data.admin === true">
        <div class="greeting">G'day Admin !</div>

        <div class="admin-panel" v-for="(hooman, index) in Users" :key="hooman">
          <div class="row">
            <p>#{{ index  }}</p>
            <p><b>Name:</b> {{ hooman.name }}</p>
            <p><b>Email:</b> {{ hooman.email }}</p>
            <p><button @click="deleteUser(hooman.email as string)">DELETE</button></p>
          </div>
        </div>

      </div>

      <div v-else>
        <h3 class="err">To access this page you need to have admin rights.</h3>
      </div>

    </div>
</template>

<script lang="ts">
import admin_crud from 'src/modules/admin_crud';
export default {
  setup() {
    const adminCrud = admin_crud;
    const { getAllUsers, deleteUser, Users, user, getAdmin, Admin } = adminCrud();

    void getAllUsers();
    void getAdmin();

    return {
      user,
      adminCrud,
      getAllUsers,
      deleteUser,
      Users,
      Admin
    };
  },

  name: 'adminPanel',
};
</script>
