<template>
  <span :class="actionByStyle">{{ actionByName }}</span>
  <span>{{ actionDescribe }}</span>
  <span :class="actionValueStyle">{{ actionValue }} </span>
  <span v-if="actionType===action.attack"> 點傷害</span>
  <span v-else> 點生命</span>
</template>

<script setup>
import {computed} from "vue";
import {action, character} from "../enums.js";

const props = defineProps(['actionBy', 'actionType', 'actionValue'])

const isActionByPlayer = computed(() => props.actionBy === character.player)
const isActionByMonster = computed(() => props.actionBy === character.monster)
const isActionTypeHeal = computed(() => props.actionType === action.heal)

const actionByStyle = computed(() => ({'log--player': isActionByPlayer.value, 'log--monster': isActionByMonster.value}))
const actionValueStyle = computed(() => ({'log--heal': isActionTypeHeal.value, 'log--damage': !isActionTypeHeal.value}))

const actionByName = computed(() => isActionByPlayer.value && character.player || isActionByMonster.value && character.monster)
const actionDescribe = computed(() => isActionTypeHeal.value ? `${action.heal}回復了` : `${action.attack} 造成 `)
</script>

<style scoped>
.log--player {
  color: #7700ff;
}

.log--monster {
  color: #da8d00;
}

.log--damage {
  color: red;
}

.log--heal {
  color: green;
}
</style>