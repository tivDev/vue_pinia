<template>
    <div class="task">
        <h3>{{ task.title }}</h3>
        <div class="icons">
            <span class="material-icons" @click="$emit('delete-task', task.id)">delete</span>
            <span class="material-icons" :class="{active: task.isFav}" @click="TaskStore.toggleFav(task.id)">favorite</span>
        </div>
    </div>
</template>

<script>
import { useTaskStore } from '../stores/TaskStore';
    export default {
        name: 'TaskDetails',
        props: ['task'],
        emits: ['delete-task'],
        setup(){
            const TaskStore = useTaskStore()
            return {
                TaskStore
            }
        }
    }
</script>