<template>
<form @submit.prevent="handleSubmit">
    <input 
      type="text" 
      placeholder="Title" 
      v-model="newTask" 
      :class="{ 'error': showError }"
      @input="clearError"
      @blur="validateField"
    >
    <button>Add Task</button>
</form>
</template>

<script>
import { ref } from 'vue';
import { useTaskStore } from '../stores/TaskStore';
    export default {
        name: 'TaskForm',
        emits: ['validation-error', 'task-created'],
        setup(props, { emit }) {
            const TaskStore = useTaskStore()
            const newTask = ref("")
            const showError = ref(false)

            const validateField = () => {
                if(newTask.value.trim().length === 0){
                    showError.value = true
                }
            }

            const handleSubmit = () => {
                if(newTask.value.trim().length === 0){
                    showError.value = true
                    emit('validation-error', 'Task title cannot be empty or space')
                    return
                }
                
                if(newTask.value.length > 0){
                    TaskStore.addTask({
                        id: Math.floor(Math.random() * 1000000),
                        title: newTask.value,
                        isFav: false
                    })
                    emit('task-created', 'Task created successfully!')
                    newTask.value = ""
                    showError.value = false
                }
            }

            const clearError = () => {
                if (newTask.value.trim().length > 0) {
                    showError.value = false
                }
            }

            return{
                handleSubmit,
                newTask,
                showError,
                clearError,
                validateField
            }
        }

    }
</script>