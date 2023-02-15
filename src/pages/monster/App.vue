<template>
  <the-navigation></the-navigation>
  <div id="game">
    <section>Round:{{ round }}</section>

    <section id="monster" class="container">
      <health-bar :health="monsterHealthPercent">Monster Health {{ state.monsterHealth }}</health-bar>
    </section>

    <section id="player" class="container">
      <health-bar :health="playerHealthPercent">Your Health {{ state.playerHealth }}</health-bar>
    </section>

    <section v-if="result" class="container">
      <battle-result :result="result" @reset="resetHandler"></battle-result>
    </section>

    <section v-if="!result" id="controls">
      <battle-actions
        :current-round="round"
        @attack="attackHandler"
        @special-attack="specialAttackHandler"
        @heal="healHandler"
        @surrender="surrenderHandler"
      ></battle-actions>
    </section>

    <section id="log" class="container">
      <battle-history :log-message="logMessage"></battle-history>
    </section>
  </div>
</template>

<script setup>
import TheNavigation from "@/components/nav/TheNavigation.vue"
import BattleHistory from "./components/BattleHistory.vue";
import BattleActions from "./components/BattleActions.vue";
import BattleResult from "./components/BattleResult.vue";
import HealthBar from "@/pages/monster/components/HealthBar.vue";
import {computed, provide, reactive, ref, watch} from "vue";

// 回合數
const round = ref(1)
const _incrementRound = () => round.value++

// 戰鬥紀錄
const logMessage = reactive([])
const logFormat = (who, what, value) => ({actionBy: who, actionType: what, actionValue: value})
const _addLogMessage = log => logMessage.unshift(log)

// 戰鬥結果
const gameResult = {lose: '玩家失敗', win: '玩家獲勝', draw: '平手'}
const result = ref(null)
const _checkWinner = (checkPoints, value) => {
  for (const check of checkPoints) {
    if (check.condition(value))
      result.value = check.result
  }
}

// 遊戲腳色設定
const character = {
  monster: {name: '怪物', isPlayer: false, prop: 'monsterHealth', lifeMax: 100},
  player: {name: '玩家', isPlayer: true, prop: 'playerHealth', lifeMax: 200},
}
const state = reactive({playerHealth: character.player.lifeMax, monsterHealth: character.monster.lifeMax})
const playerHealthPercent = computed(() => (state.playerHealth / character.player.lifeMax) * 100)
const monsterHealthPercent = computed(() => (state.monsterHealth / character.monster.lifeMax) * 100)

// 回合行動設定
const _getRandomValue = range => (Math.floor(Math.random() * (Math.max(...range) - Math.min(...range))) + Math.min(...range))
const _healRule = (HP, healHP) => HP + healHP >= playerLifeMax ? playerLifeMax : HP + healHP
const _attackRule = (HP, damage) => HP - damage <= 0 ? 0 : HP - damage
const _roundAction = (who, action, user) => {
  const point = _getRandomValue(action.power)
  state[user.prop] = action.rule(state[user.prop], point)
  _addLogMessage(logFormat(who, action.name, point))
}
const action = {
  attack: {name: '攻擊', power: [5, 12], rule: _attackRule},
  heavyAttack: {name: '重擊', power: [10, 25], rule: _attackRule},
  heal: {name: '治療', power: [8, 20], rule: _healRule},
  monsterAttack: {name: '攻擊', power: [8, 15], rule: _attackRule},
}

// 按鈕事件
const attackHandler = () => {
  _incrementRound()
  _roundAction(character.monster, action.monsterAttack, character.player)
  _roundAction(character.player, action.attack, character.monster)
}
const specialAttackHandler = () => {
  _incrementRound()
  _roundAction(character.monster, action.monsterAttack, character.player)
  _roundAction(character.player, action.heavyAttack, character.monster)
}
const healHandler = () => {
  _incrementRound()
  _roundAction(character.monster, action.monsterAttack, character.player)
  _roundAction(character.player, action.heal, character.player)
}
const surrenderHandler = () => result.value = gameResult.lose
const resetHandler = () => {
  result.value = null
  round.value = 1
  logMessage.length = 0
  state.playerHealth = 100
  state.monsterHealth = 100
}

// 監視生命值變化
watch(() => state.playerHealth, value => {
  const checkPoints = [
    {result: gameResult.draw, condition: value => value <= 0 && state.monsterHealth <= 0},
    {result: gameResult.lose, condition: value => value <= 0}
  ]
  _checkWinner(checkPoints, value)
})
watch(() => state.monsterHealth, value => {
  const checkPoints = [
    {result: gameResult.draw, condition: value => value <= 0 && state.playerHealth <= 0},
    {result: gameResult.win, condition: value => value <= 0}
  ]
  _checkWinner(checkPoints, value)
})

provide('action', action)
</script>

<style scoped>
* {
  box-sizing: border-box;
}

html {
  font-family: 'Jost', sans-serif;
}

.container {
  text-align: center;
  padding: 0.5rem;
  margin: 1rem auto;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  border-radius: 12px;
}

section {
  width: 90%;
  max-width: 40rem;
  margin: auto;
}


#monster h2,
#player h2 {
  margin: 0.25rem;
}

#controls {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}
</style>