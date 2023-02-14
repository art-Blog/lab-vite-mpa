<template>
  <base-button @click="$emit('attack')">ATTACK</base-button>
  <base-button :disabled="allowSpecialAttack" @click="$emit('specialAttack')">SPECIAL ATTACK</base-button>
  <base-button @click="$emit('heal')">HEAL</base-button>
  <base-button @click="$emit('surrender')">SURRENDER</base-button>
</template>

<script setup>
import BaseButton from "@/components/UI/BaseButton.vue";
import {computed} from "vue";

defineEmits(['attack', 'specialAttack', 'heal', 'surrender'])
const props = defineProps(['currentRound'])
const allowSpecialAttack = computed(() => props.currentRound % 3 !== 0)
</script>
