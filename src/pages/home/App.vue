<template>
  <layout-default>
    <div class="demo">
      <base-tab-button :class="{ active: currentTab === tab }"
                       v-for="(_, tab) in tabs" :key="tab"
                       @click="currentTab = tab">{{ tab }}
      </base-tab-button>
      <base-tab>
        <component :is="tabs[currentTab]"></component>
      </base-tab>
    </div>
  </layout-default>
 
</template>

<script setup>
import {ref} from "vue";
import BaseTabButton from "@/components/UI/BaseTabButton.vue";
import BaseTab from "@/components/UI/BaseTab.vue";
import LayoutDefault from "@/components/layout/LayoutDefault.vue";
import Archive from "@/pages/home/components/Archive.vue";
import IntroMonster from "@/pages/monster/components/IntroMonster.vue";
import IntroAbout from "@/pages/about/components/IntroAbout.vue";

const currentTab = ref('IntroMonster')
const tabs = {
  IntroMonster,
  IntroAbout,
  Archive,
}
</script>