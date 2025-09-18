<template>
  <main>

    <!-- heading -->
    <header>
      <img src="https://pinia.vuejs.org/logo.svg" alt="pinia logo">
      <h1>Pinia Tasks</h1>
    </header>

    <!-- new task form -->
     <div class="new-task-form">
       <TaskForm 
         @validation-error="showValidationError" 
         @task-created="showSuccessMessage" 
       />
     </div>
    <nav class="filter">
      <button :class="{ active: filter === 'all' }" @click="filter = 'all'">All</button>
      <button :class="{ active: filter === 'favs' }" @click="filter = 'favs'">Favorites</button>
    </nav>

    <!-- task list -->
    <div class="task-list" v-if="filter === 'all'">
      <p>You have {{ TaskStore.totalCount }} task{{ TaskStore.totalCount !== 1 ? 's' : '' }} left to do</p>
      <div v-for="task in TaskStore.tasks" :key="task.id" >
        <TaskDetails :task="task" @delete-task="openConfirmModal" />
      </div>
    </div>
    
    <div class="task-list" v-if="filter === 'favs'">
      <p>You have {{ TaskStore.favCount }} favorite{{ TaskStore.favCount !== 1 ? 's' : '' }} left to do</p>
      <div v-for="task in TaskStore.favs" :key="task.id">
        <TaskDetails :task="task" @delete-task="openConfirmModal" />
      </div>
    </div>

    <!-- Confirmation Modal -->
    <ConfirmModal 
      v-if="showConfirmModal" 
      @confirm="confirmDelete" 
      @cancel="cancelDelete"
      message="Are you sure you want to delete this task?"
    />
    
    <!-- Toast Notification -->
    <Toast 
      v-if="showToast" 
      :message="toastMessage" 
      :type="toastType" 
      @close="showToast = false" 
    />

  </main>
</template>

<script>
import { ref } from 'vue'
import TaskDetails from './components/TaskDetails.vue';
import TaskForm from './components/TaskForm.vue';
import ConfirmModal from './components/ConfirmModal.vue';
import Toast from './components/Toast.vue';
import { useTaskStore } from './stores/TaskStore'

export default {
  components: { 
    TaskDetails,
    TaskForm,
    ConfirmModal,
    Toast
  },

  setup() {
    const TaskStore = useTaskStore()
    const filter = ref('all')
    const showConfirmModal = ref(false)
    const showToast = ref(false)
    const toastMessage = ref('')
    const toastType = ref('success')
    const taskToDelete = ref(null)

    const openConfirmModal = (taskId) => {
      taskToDelete.value = taskId
      showConfirmModal.value = true
    }

    const showValidationError = (message) => {
      showToast.value = true
      toastMessage.value = message
      toastType.value = 'error'
    }

    const showSuccessMessage = (message) => {
      showToast.value = true
      toastMessage.value = message
      toastType.value = 'success'
    }

    const confirmDelete = () => {
      if (taskToDelete.value) {
        TaskStore.deleteTask(taskToDelete.value)
        showToast.value = true
        toastMessage.value = 'Task deleted successfully'
        toastType.value = 'success'
      }
      showConfirmModal.value = false
      taskToDelete.value = null
    }

    const cancelDelete = () => {
      showConfirmModal.value = false
      taskToDelete.value = null
    }

    return {
      TaskStore,
      filter,
      showConfirmModal,
      showToast,
      toastMessage,
      toastType,
      openConfirmModal,
      confirmDelete,
      cancelDelete,
      showValidationError,
      showSuccessMessage
    }
  }
}
</script>