import { defineStore } from "pinia";

export const useTaskStore = defineStore("task", {
  state: () => ({
    tasks: [
      { id: 1, title: "Task 1", description: "Description 1", isFav: true },
      { id: 2, title: "Task 2", description: "Description 2", isFav: false },
      { id: 3, title: "Task 3", description: "Description 3", isFav: false },
    ],
  }),

  getters: {
    favs() {
      return this.tasks.filter((t) => t.isFav);
    },
    favCount() {
      return this.tasks.reduce((p, c) => (c.isFav ? p + 1 : p), 0);
    },
    totalCount: (state) => {
      return state.tasks.length;
    },
  },
  actions: {
    addTask(task) {
      this.tasks.push(task);
    },

    deleteTask(id) {
      this.tasks = this.tasks.filter((t) => t.id !== id);
    },

    toggleFav(id) {
      const task = this.tasks.find((t) => t.id === id);
      if (task) task.isFav = !task.isFav;
    },
  },
});
