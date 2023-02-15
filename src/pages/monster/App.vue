<template>
  <the-navigation></the-navigation>
  <div id="game">
    <section>Round:{{ currentRound }}</section>

    <section id="monster" class="container">
      <health-bar :health="monsterHealth">Monster Health {{ monsterHealth }}</health-bar>
    </section>

    <section id="player" class="container">
      <health-bar :health="playerHealth">Your Health {{ playerHealth }}</health-bar>
    </section>

    <section v-if="gameResult" class="container">
      <battle-result :result="gameResult" @reset="reset"></battle-result>
    </section>

    <section v-if="!gameResult" id="controls">
      <battle-actions
        :current-round="currentRound"
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

<script>
import TheNavigation from "@/components/nav/TheNavigation.vue"
import BaseButton from "@/components/UI/BaseButton.vue";

import BattleHistory from "./components/BattleHistory.vue";
import BattleActions from "./components/BattleActions.vue";
import BattleResult from "./components/BattleResult.vue";
import {action, gameResult} from "./enums.js";
import HealthBar from "@/pages/monster/components/HealthBar.vue";

const getRandomValue = range => (Math.floor(Math.random() * (Math.max(...range) - Math.min(...range))) + Math.min(...range))
const logFormat = (who, what, value) => ({actionBy: who, actionType: what, actionValue: value})

const character = {
  monster: {name: '怪物', isPlayer: false, prop: 'monsterHealth'},
  player: {name: '玩家', isPlayer: true, prop: 'playerHealth'},
}

export default {
  components: {
    HealthBar,
    BattleResult,
    BaseButton,
    BattleActions,
    TheNavigation,
    BattleHistory,
  },
  data() {
    return {
      playerHealth: 100,
      monsterHealth: 100,
      currentRound: 1,
      gameResult: null,
      logMessage: [],
    }
  },
  watch: {
    playerHealth(value) {
      if (value <= 0 && this.monsterHealth <= 0) {
        this.gameResult = gameResult.draw
      } else if (value <= 0) {
        this.gameResult = gameResult.lose
      }
    },
    monsterHealth(value) {
      if (value <= 0 && this.playerHealth <= 0) {
        this.gameResult = gameResult.draw
      } else if (value <= 0) {
        this.gameResult = gameResult.win
      }
    },
  },
  methods: {
    _incrementRound() {
      this.currentRound++
    },
    surrenderHandler() {
      this.gameResult = gameResult.lose
    },
    addLogMessage(logMessage) {
      this.logMessage.unshift(logMessage)
    },
    reset() {
      this.playerHealth = 100
      this.monsterHealth = 100
      this.currentRound = 1
      this.gameResult = null
      this.logMessage = []
    },
    attackHandler() {
      this._incrementRound()
      this._roundAction(character.monster, action.monsterAttack, character.player)
      this._roundAction(character.player, action.attack, character.monster)
    },
    specialAttackHandler() {
      this._incrementRound()
      this._roundAction(character.monster, action.monsterAttack, character.player)
      this._roundAction(character.player, action.heavyAttack, character.monster)
    },
    healHandler() {
      this._incrementRound()
      this._roundAction(character.monster, action.monsterAttack, character.player)
      this._roundAction(character.player, action.heal, character.player)

    },
    _roundAction(who, action, user) {
      const point = getRandomValue(action.power)
      this[user.prop] = action.rule(this[user.prop], point)
      this.addLogMessage(logFormat(who, action.name, point))
    },
  }
}

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