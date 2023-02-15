<template>
  <base-monster-button @click="$emit('attack')">ATTACK</base-monster-button>
  <base-monster-button :disabled="allowSpecialAttack" @click="$emit('specialAttack')">SPECIAL ATTACK</base-monster-button>
  <base-monster-button @click="$emit('heal')">HEAL</base-monster-button>
  <base-monster-button @click="$emit('surrender')">SURRENDER</base-monster-button>
</template>

<script setup>
import BaseMonsterButton from "@/components/UI/BaseMonsterButton.vue";
import {computed} from "vue";

defineEmits(['attack', 'specialAttack', 'heal', 'surrender'])
const props = defineProps(['currentRound'])
const allowSpecialAttack = computed(() => props.currentRound % 3 !== 0)
</script>
