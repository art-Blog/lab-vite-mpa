<template>
  <the-navigation></the-navigation>
  <h2>Home</h2>
  <div class="demo">
    <base-tab-button :class="{ active: currentTab === tab }"
                     v-for="(_, tab) in tabs" :key="tab"
                     @click="currentTab = tab">{{ tab }}
    </base-tab-button>
    <base-tab>
      <component :is="tabs[currentTab]"></component>  
    </base-tab>
  </div>
</template>

<script setup>
import TheNavigation from "@/components/nav/TheNavigation.vue"
import IntroMonster from "@/pages/home/components/IntroMonster.vue";
import {ref} from "vue";
import BaseTabButton from "@/components/UI/BaseTabButton.vue";
import Archive from "@/pages/home/components/Archive.vue";
import BaseTab from "@/components/UI/BaseTab.vue";

const currentTab = ref('IntroMonster')
const tabs = {
  IntroMonster,
  Archive,
}
</script>
<style scoped>
.demo {
  font-family: sans-serif;
  border: 1px solid #eee;
  border-radius: 2px;
  padding: 20px 30px;
  margin-top: 1em;
  margin-bottom: 40px;
  user-select: none;
  overflow-x: auto;
}
</style>
