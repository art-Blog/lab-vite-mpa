<template>
  <the-navigation></the-navigation>
  <div id="game">
    <section>Round:{{ currentRound }}</section>
    <section id="monster" class="container">
      <h2>Monster Health {{ monsterHealth }}</h2>
      <div class="healthbar">
        <div class="healthbar__value" :style="monsterBarStyle"></div>
      </div>
    </section>
    <section id="player" class="container">
      <h2>Your Health {{ playerHealth }}</h2>
      <div class="healthbar">
        <div class="healthbar__value" :style="playerBarStyle"></div>
      </div>
    </section>

    <section v-if="winner" class="container">
      <battle-result :winner="winner" @reset="reset"></battle-result>
    </section>

    <section v-if="!winner" id="controls">
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
import {action, character, gameResult} from "./enums.js";

const getRandomValue = range => (Math.floor(Math.random() * (Math.max(...range) - Math.min(...range))) + Math.min(...range))
const getCurrentHealHP = (currentHP, healHP) => currentHP + healHP >= 100 ? 100 : currentHP + healHP
const getCurrentHP = (currentHP, damage) => currentHP - damage <= 0 ? 0 : currentHP - damage
const logFormat = (who, what, value) => ({actionBy: who, actionType: what, actionValue: value})

const range = {
  player: [5, 12],
  special: [10, 25],
  monster: [8, 15],
  heal: [8, 20]
}
export default {
  components: {
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
      winner: null,
      logMessage: [],
    }
  },
  computed: {
    monsterBarStyle() {
      return {width: this.monsterHealth + "%"}
    },
    playerBarStyle() {
      return {width: this.playerHealth + "%"}
    },
  },
  watch: {
    playerHealth(value) {
      if (value <= 0 && this.monsterHealth <= 0) {
        this.winner = gameResult.draw
      } else if (value <= 0) {
        this.winner = gameResult.monster
      }
    },
    monsterHealth(value) {
      if (value <= 0 && this.playerHealth <= 0) {
        this.winner = gameResult.draw
      } else if (value <= 0) {
        this.winner = gameResult.player
      }
    },
  },
  methods: {
    _incrementRound() {
      this.currentRound++
    },
    surrenderHandler() {
      this.winner = character.monster
    },
    setPlayerHealth(hp) {
      this.playerHealth = hp
    },
    setMonsterHealth(hp) {
      this.monsterHealth = hp
    },
    addLogMessage(logMessage) {
      this.logMessage.unshift(logMessage)
    },
    reset() {
      this.playerHealth = 100
      this.monsterHealth = 100
      this.currentRound = 1
      this.winner = null
      this.logMessage = []
    },
    attackHandler() {
      this._incrementRound()
      this._attackSomeone(character.monster, action.attack, getRandomValue(range.monster), this.playerHealth, this.setPlayerHealth)
      this._attackSomeone(character.player, action.attack, getRandomValue(range.player), this.monsterHealth, this.setMonsterHealth)
    },
    specialAttackHandler() {
      this._incrementRound()
      this._attackSomeone(character.monster, action.attack, getRandomValue(range.monster), this.playerHealth, this.setPlayerHealth)
      this._attackSomeone(character.player, action.attack, getRandomValue(range.special), this.monsterHealth, this.setMonsterHealth)
    },
    healHandler() {
      this._incrementRound()
      this._attackSomeone(character.monster, action.attack, getRandomValue(range.monster), this.playerHealth, this.setPlayerHealth)
      this._playerSelfHeal(getRandomValue(range.heal))
    },
    _playerSelfHeal(point) {
      this.addLogMessage(logFormat(character.player, action.heal, point))
      this.setPlayerHealth(getCurrentHealHP(this.playerHealth, point))
    },
    _attackSomeone(who, action, point, from, setHealth) {
      this.addLogMessage(logFormat(who, action, point))
      setHealth(getCurrentHP(from, point))
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

.healthbar {
  width: 100%;
  height: 40px;
  border: 1px solid #575757;
  margin: 1rem 0;
  background: #fde5e5;
}

.healthbar__value {
  background-color: #00a876;
  width: 100%;
  height: 100%;
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