<template>
    <div class="task">
        <h3>{{ task.title }}</h3>
        <div class="icons">
            <span class="material-icons" @click="TaskStore.deleteTask(task.id)">delete</span>
            <span class="material-icons" :class="{active: task.isFav}" @click="TaskStore.toggleFav(task.id)">favorite</span>
        </div>
    </div>
</template>

<script>
import { useTaskStore } from '../stores/TaskStore';
    export default {
        name: 'TaskDetails',
        props: ['task'],
        setup(){
            const TaskStore = useTaskStore()
            return {
                TaskStore
            }
        }
    }
</script>

