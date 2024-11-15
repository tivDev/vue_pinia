<template>
<form @submit.prevent="handleSubmit">
    <input type="text" placeholder="Title" v-model="newTask">
    <button>Add Task</button>
</form>
</template>

<script>
import { ref } from 'vue';
import { useTaskStore } from '../stores/TaskStore';
    export default {
        name: 'TaskForm',
        setup() {
            const TaskStore = useTaskStore()
            const newTask = ref("")

            const handleSubmit = () => {
                if(newTask.value.length > 0){
                    TaskStore.addTask({
                        id: Math.floor(Math.random() * 1000000),
                        title: newTask.value,
                        isFav: false
                    })
                    newTask.value = ""
                }
            }
            return{
                handleSubmit,
                newTask
            }
        }

    }
</script>