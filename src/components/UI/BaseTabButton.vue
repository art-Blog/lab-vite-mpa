<template>
  <button>
    <slot></slot>
  </button>
</template>

<script setup>
</script>

<style scoped>
button {
  padding: 6px 10px;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
  border: 1px solid #ccc;
  cursor: pointer;
  background: #f0f0f0;
  margin-bottom: -1px;
  margin-right: -1px;
}
button:hover {
  background: #e0e0e0;
}
button.active {
  background: #e0e0e0;
}
</style>