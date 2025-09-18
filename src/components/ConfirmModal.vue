<template>
  <div class="modal-overlay" @click.self="$emit('cancel')">
    <div class="modal-container">
      <div class="modal-content">
        <p>{{ message }}</p>
      </div>
      <div class="modal-actions">
        <button class="cancel-btn" @click="$emit('cancel')">Cancel</button>
        <button class="confirm-btn" @click="$emit('confirm')">Delete</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ConfirmModal',
  props: {
    message: {
      type: String,
      default: 'Are you sure?'
    }
  },
  emits: ['confirm', 'cancel']
}
</script>