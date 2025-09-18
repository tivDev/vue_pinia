<template>
  <div class="toast" :class="type">
    <p>{{ message }}</p>
    <span class="close-btn" @click="$emit('close')">×</span>
  </div>
</template>

<script>
export default {
  name: 'Toast',
  props: {
    message: String,
    type: {
      type: String,
      default: 'success'
    }
  },
  emits: ['close'],
  mounted() {
    // Auto-close after 3 seconds
    setTimeout(() => {
      this.$emit('close')
    }, 3000)
  }
}
</script>