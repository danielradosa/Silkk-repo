<template>
  <div class="projects">
    <div class="text-h3 project-single-title">
      {{ Project.title }}
      <q-popup-edit v-model="Project.title" auto-save v-slot="scope">
        <q-input
          v-model="scope.value"
          autofocus
          counter
          @keyup.enter="scope.set"
        />
      </q-popup-edit>
      <q-icon class="edit" name="edit" size=".5em" right></q-icon>
      <q-icon class="save" name="save" size=".5em" right @click="updateProjectTitle(Project._id, projectTitle = Project.title)"></q-icon>
    </div>
    <div class="text-h5 project-subtitle">
      Deadline: <span> {{ Project.deadline }} by {{ Author.data.name }} </span>
      <br />
      Description: <span> {{ Project.description }}</span>
    </div>
  </div>

  <!-- ////////////// TO-DO /////////////////// -->
<div class="todo">
 <div class="container">
		<h2>Title</h2>
	

		<h3>Todo</h3>
		<ul id="incomplete-tasks">
			<li><input type="checkbox"><label>Test1</label><input type="text"><button class="edit">Edit</button><button class="delete">Delete</button></li>
			<li><input type="checkbox"><label>Test2</label><input type="text" value="Go Shopping"><button class="edit">Edit</button><button class="delete">Delete</button></li>
      <li><input type="checkbox"><label>Test3</label><input type="text" value="Go Shopping"><button class="edit">Edit</button><button class="delete">Delete</button></li>
		</ul>

		<h3>Completed</h3>
		<ul id="completed-tasks">
			<li><input type="checkbox" checked><label>Test4r</label><input type="text"><button class="edit">Edit</button><button class="delete">Delete</button></li>
		</ul>
	</div>
  
  </div>
</template>

<script lang="ts">
import project_crud from 'src/modules/project_crud';

export default {
  setup() {
    const projectCrud = project_crud;
    const {
      Author,
      Project,
      projectTitle,
      urlSingle,
      user,
      token,
      getSingle,
      getAuthor,
      updateProjectTitle,
    } = projectCrud();

    void getSingle();
    void getAuthor();

    return {
      updateProjectTitle,
      getAuthor,
      Author,
      projectCrud,
      projectTitle,
      getSingle,
      urlSingle,
      user,
      token,
      Project,
    };
  },

  name: 'singleProject',
};
</script>
