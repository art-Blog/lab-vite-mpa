<template>
  <h2>Game Over</h2>
  <h3 v-if="result">{{ result }}</h3>
  <base-button @click="$emit('reset')">Start New Game</base-button>
</template>

<script setup>
import BaseButton from "@/components/UI/BaseButton.vue";

defineProps(['result'])
defineEmits(['reset'])
</script>
