<template>
  <main>

    <!-- heading -->
    <header>
      <img src="https://pinia.vuejs.org/logo.svg" alt="pinia logo">
      <h1>Pinia Tasks</h1>
    </header>

    <!-- new task form -->
     <div class="new-task-form">
       <TaskForm />
     </div>
    <nav class="filter">
      <button @click="filter = 'all'">All</button>
      <button @click="filter = 'favs'">Favorites</button>
    </nav>

    <!-- task list -->
    <div class="task-list" v-if="filter === 'all'">
      <p>You have {{ TaskStore.totalCount }} task left to do:</p>
      <div v-for="task in TaskStore.tasks" :key="task.id" >
        <TaskDetails :task="task" />
      </div>
    </div>
    
    <div class="task-list" v-if="filter === 'favs'">
      <p>You have {{ TaskStore.favCount }} favs left to do</p>
      <div v-for="task in TaskStore.favs" :key="task.id">
        <TaskDetails :task="task" />
      </div>
    </div>

  </main>
</template>

<script>
import {ref} from 'vue'
import TaskDetails from './components/TaskDetails.vue';
import TaskForm from './components/TaskForm.vue';
import { useTaskStore } from './stores/TaskStore'
  export default {
    components: { 
      TaskDetails,
      TaskForm
     },

    setup() {
      const TaskStore = useTaskStore()

      const filter = ref('all')

      return {
        TaskStore,
        filter
      }
    }
    
  }
</script>