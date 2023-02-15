<template>
  <layout>
    <div class="demo">
      <base-tab-button :class="{ active: currentTab === tab }"
                       v-for="(_, tab) in tabs" :key="tab"
                       @click="currentTab = tab">{{ tab }}
      </base-tab-button>
      <base-tab>
        <component :is="tabs[currentTab]"></component>
      </base-tab>
    </div>
  </layout>
 
</template>

<script setup>
import IntroMonster from "@/pages/monster/components/IntroMonster.vue";
import BaseTabButton from "@/components/UI/BaseTabButton.vue";
import Archive from "@/pages/home/components/Archive.vue";
import BaseTab from "@/components/UI/BaseTab.vue";
import {ref} from "vue";
import Layout from "@/components/layout/Layout.vue";

const currentTab = ref('IntroMonster')
const tabs = {
  IntroMonster,
  Archive,
}
</script>
<style scoped>
</style>
