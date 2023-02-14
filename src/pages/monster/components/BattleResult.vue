<template>
  <h2>Game Over</h2>
  <h3 v-if="winner === gameResult.monster">you lost!</h3>
  <h3 v-if="winner === gameResult.player">you won!</h3>
  <h3 v-if="winner === gameResult.draw">It's a draw!</h3>
  <base-button @click="$emit('reset')">Start New Game</base-button>
</template>

<script setup>
import BaseButton from "@/components/UI/BaseButton.vue";
import {gameResult} from "../enums.js";

defineProps(['winner'])
defineEmits(['reset'])
</script>
